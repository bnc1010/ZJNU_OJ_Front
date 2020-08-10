<template>
  <div class="app-container">
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getUsers">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table
        :data="users"
        highlight-current-row
        v-loading="listLoading"
        @selection-change="selsChange"
        style="width: 100%"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="uId" label="ID" width="120" sortable></el-table-column>
        <el-table-column prop="userName" label="用户名" width="150" sortable></el-table-column>
        <el-table-column prop="uRank" label="身份" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80" :formatter="formatSex"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80" sortable></el-table-column>
        <el-table-column prop="birthday" label="生日" :formatter="formatDate"></el-table-column>
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

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20"
          :total="this.total"
          style="float:right;"
        ></el-pagination>
      </el-col>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="editForm.userName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false, editLoading=false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body="true">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.sex">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number v-model="addForm.age" :min="0" :max="150"></el-input-number>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
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
    </section>
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
      filters: {
        name: ""
      },
      users: [],
      total: 0,
      pageNum: 1,
      pageSize: 20,
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
        age: -1,
        birthday: "",
        password: "",
        sex: -1,
        uId: -1,
        uRank: -1,
        userName: ""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      roleVisible: false,
      addFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        age: -1,
        birthday: "",
        password: "",
        sex: -1,
        uId: -1,
        uRank: -1,
        userName: ""
      },
      nowId: -1,
      roleData: [],
      roleValue: [],
      roles: [],
      perRoleValue: []
    };
  },
  methods: {
    //性别显示转换
    formatSex: function(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    formatDate: function(row, column) {
      if (row.birthday) {
        return row.birthday.split(" ")[0];
      } else {
        return "-";
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      let pageNum = this.pageNum;
      let pageSize = this.pageSize;
      this.listLoading = true;
      //NProgress.start();
      getUserList(pageNum, pageSize).then(res => {
        this.total = res.etxra.total;
        this.users = res.data;
        this.listLoading = false;
        // console.log( res.etxra);
        //NProgress.done();
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
        age: null,
        birthday: null,
        password: "123456",
        sex: null,
        uRank: 10000,
        userName: ""
      };
    },
    handleReset: function(index, row) {
      this.$confirm("确认重置该用户密码?", "提示", {
        type: "warning"
      })
        .then(() => {
          //NProgress.start();
          // console.log(row)
          resetUser(row.uId)
            .then(res => {
              //NProgress.done();
              this.$message({
                message: "重置成功",
                type: "success"
              });
            })
            .catch(err => {
              // console.log(err.response)
            });
        })
        .catch(() => {});
    },

    flushRole: function() {
      this.roleData = [];
      for (var x in this.roles) {
        // console.log(this.permission[x])
        this.roleData.push({
          key: this.roles[x].rId,
          label: this.roles[x].roleName
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
      this.nowId = row.uId;

      getUserRole(row.uId)
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
            para.birthday =
              !para.birthday || para.birthday == ""
                ? null
                : util.formatDate.format(
                    new Date(para.birthday),
                    "yyyy-MM-dd HH:mm:ss"
                  );
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
            console.log(
              util.formatDate.format(new Date(para.birthday), "yyyy-MM-dd")
            );
            para.birthday =
              !para.birthday || para.birthday == ""
                ? null
                : util.formatDate.format(
                    new Date(para.birthday),
                    "yyyy-MM-dd HH:mm:ss"
                  );
            console.log(para);
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
</style>
