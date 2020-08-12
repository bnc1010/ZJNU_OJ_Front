<template>
  <div class="app-container">
    <el-card>
      <!--工具条-->
      <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-input placeholder="搜索用户名或ID" v-model="page.query" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                
              </div>
          </el-col>
          <el-col :span="6"><div class="grid-content bg-purple"><el-button type="primary" plain @click="handleAdd">新建用户</el-button></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </el-card>
    <el-card class="bodybox">
      <!--列表-->
      <el-table
        :data="users"
        highlight-current-row
        v-loading="listLoading"
        @selection-change="selsChange"
        style="width: 100%"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="ID" width="120"></el-table-column>
        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="level" label="权限等级" width="120"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
              <svg-icon icon-class="edit" />
            </el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">
              <i class="el-icon-delete" />
            </el-button>
            <el-button size="small" @click="handleReset(scope.$index, scope.row)">
              <i class="el-icon-refresh" />
            </el-button>
            <el-button size="small" @click="handleRole(scope.$index, scope.row)">
              <i class="el-icon-tickets" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider></el-divider>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <center>
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.index"
          :page-sizes="[20, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
          </el-pagination>
        </center>
      </el-col>
    </el-card>
    <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <!-- <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="level" label="权限等级" width="120"></el-table-column> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false, editLoading=false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body="true">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="初始密码" prop="password">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false, addLoading = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="roleVisible" :append-to-body="true">
        <div style="text-align: center">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="roleValue"
            :data="roleData"
            :titles="['可分配角色', '已有角色']"
          ></el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="roleVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateRole();">提 交</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import util from "@/utils/formatDate";
//import NProgress from 'nprogress'
import {
  getUserList,
  addUser,
  removeUser,
  updateUser,
  resetUser,
  getUserRole,
  getRoleList,
  grantRoleToUser,
  dropRoleFromUser
} from "@/api/user-role-permission";
import { log } from "util";
import { type } from 'os';
export default {
  data() {
    return {
      page:{
        index:1,
        total:0,
        size:20,
        query:''
      },
      filters: {
        name: ""
      },
      users: [],
      listLoading: false,
      resetLoading: false,
      sels: [], //列表选中列
      editFormVisible: false, 
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        username: "",
        name:'',
        email:'',
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      roleVisible: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        username: "",
        name:'',
        email:'',
        password: "",
      },
      nowId: -1,
      roleData: [],
      roleValue: [],
      roles: [],
      perRoleValue: []
    };
  },
  methods: {
    handleCurrentChange: function(val){
      this.page.index=val
      this.getUsers();
      // this.flushProblemList()
      console.log(val)
    },
    handleSizeChange: function(val){
        this.page.size=val
        // this.flushProblemList()
        console.log(val)
    },
    //获取用户列表
    getUsers() {
      let pageNum = this.page.index;
      let pageSize = this.page.size;
      this.listLoading = true;
      //NProgress.start();
      getUserList(pageNum, pageSize).then(res => {
        this.page.total = res.pagetotal;
        this.users = res.data;
        this.listLoading = false;
        // console.log( res.etxra);
        //NProgress.done();
      }).catch(err => {
        console.log(err)
        this.$message({
          type:'error',
          message: '用户列表加载失败'
        })
      });
    },
    //删除
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          // console.log(row)
          removeUser([row.uId])
            .then(res => {
              this.listLoading = false;
              //NProgress.done();
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getUsers();
            })
            .catch(err => {
              this.listLoading = false;
              // console.log(err.response)
            });
        })
        .catch(() => {});
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      console.log(this.editForm);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        password: "123456",
        level: 10000,
        username: "",
        email:""
      };
    },
    handleReset: function(index, row) {
      this.$confirm("确认重置该用户密码?", "提示", {
        type: "warning"
      })
        .then(() => {
          //NProgress.start();
          // console.log(row)
          resetUser(row.id)
            .then(res => {
              //NProgress.done();
              this.$message({
                message: "重置成功",
                type: "success"
              });
            })
            .catch(err => {
              this.$message({
                type:'error',
                message:"重置密码失败"
              })
            });
        })
        .catch(() => {});
    },

    flushRole: function() {
      this.roleData = [];
      for (var x in this.roles) {
        // console.log(this.permission[x])
        this.roleData.push({
          key: this.roles[x].id,
          label: this.roles[x].name
        });
      }
      this.roleValue = [];
    },
    getRoles: function() {
      getRoleList().then(res => {
        this.roles = res.data;
      });
    },
    handleRole: function(index, row) {
      this.roleVisible = true;
      this.getRoles();
      this.flushRole();
      this.nowId = row.id;

      getUserRole(row.id)
        .then(res => {
          this.roleValue = res.data;
          this.perRoleValue = res.data;
        })
        .catch(err => {
          console.log(err.response);
          // this.$message({
          // 		message: err.response.msg,
          // 		type: 'fail'
          // 	});
        });
    },

    handleUpdateRole: function(index, row) {
      let del = [];
      let add = [];
      for (var x in this.perRoleValue) {
        var flag = false;
        for (var y in this.roleValue) {
          if (this.perRoleValue[x] == this.roleValue[y]) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          del.push(this.perRoleValue[x]);
        }
      }
      for (var x in this.roleValue) {
        var flag = false;
        for (var y in this.perRoleValue) {
          if (this.perRoleValue[y] == this.roleValue[x]) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          add.push(this.roleValue[x]);
        }
      }
      // console.log(del);
      // console.log(add);
      this.loading = true;
      if (del.length > 0) {
        dropRoleFromUser(this.nowId, del).then(res => {
          //NProgress.done();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        });
      }
      if (add.length > 0) {
        grantRoleToUser(this.nowId, add).then(res => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        });
      }
      this.loading = false;
      this.roleVisible = false;
      this.getUsers();
    },

    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            updateUser(para)
              .then(res => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              })
              .catch(err => {
                this.editLoading = false;
                console.log(err.response);
              });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            addUser(para)
              .then(res => {
                this.editLoading = false;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getUsers();
                this.addLoading = false;
              })
              .catch(err => {
                this.addLoading = false;
                console.log(err.response);
              });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.uId)
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          
          // console.log(ids)
            // console.log(ids[id])
          removeUser(ids).then(res =>{
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          }).catch(err => {
            console.log(err)
          })
          this.listLoading = false;
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getUsers();
    this.getRoles();
  }
};
</script>

<style scoped>
.bodybox{
  margin-top: 20px;
}
.el-col{
    border: 1px solid transparent; 
}
</style>
