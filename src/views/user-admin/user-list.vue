<template>
  <div class="app-container">
    <el-card>
      <!--工具条-->
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="page.query" placeholder="搜索用户名" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" plain @click="handleAdd">新建用户</el-button>
            <el-button type="primary" plain @click="batchRegisterVisiable = true">批量新建</el-button>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
      </el-row>
    </el-card>
    <el-card class="bodybox">
      <!--列表-->
      <el-table
        v-loading="listLoading"
        :data="users"
        highlight-current-row
        style="width: 100%"
        @selection-change="selsChange"
      >
        <el-table-column type="selection" />
        <el-table-column prop="id" label="ID" width="120" />
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="level" label="权限等级" width="120" />

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
      <el-divider />
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" :disabled="this.sels.length===0" @click="batchRemove">批量删除</el-button>
        <div class="pagebar">
          <center>
            <el-pagination
                :current-page="page.index"
                :page-sizes="[20, 50, 100]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
          </center>
        </div>
      </el-col>
    </el-card>
    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true">
      <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off" />
        </el-form-item>
        <!-- <el-table-column prop="name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
          <el-table-column prop="level" label="权限等级" width="120"></el-table-column> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false, editLoading=false">取消</el-button>
        <el-button type="primary" :loading="editLoading" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body="true">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off" />
        </el-form-item>
        <el-form-item label="初始密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false, addLoading = false">取消</el-button>
        <el-button type="primary" :loading="addLoading" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="roleVisible" :append-to-body="true">
      <div style="text-align: center">
        <el-transfer
          v-model="roleValue"
          style="text-align: left; display: inline-block"
          :data="roleData"
          :titles="['可分配角色', '已有角色']"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateRole();">提 交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量新建用户" :visible.sync="batchRegisterVisiable" :append-to-body="true">
      <el-dialog
        width="80%"
        title="新建结果"
        :visible.sync="batchUsersShowResult"
        append-to-body>
        <el-progress :percentage="batchUsersProgress"></el-progress>
        <el-input
          type="textarea"
          :rows="20"
          v-model="batchUsersLog"
          :readonly="true">
        </el-input>
      </el-dialog>
      <el-checkbox-group v-model="checkList">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-checkbox label="前缀"></el-checkbox>
            <div style="width:250px;">
              <el-input v-model="inputFront" placeholder="请输入内容" size="medium"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox label="数值区补齐长度"></el-checkbox>
            <div style="width:250px;">
              <el-input v-model="inputLength" placeholder="请输入内容" size="medium"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-checkbox label="后缀"></el-checkbox>
            <div style="width:250px;">
              <el-input v-model="inputBack" placeholder="请输入内容" size="medium"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-checkbox-group>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="数值区范围:">
            <el-input v-model="inputFrom" placeholder="请输入内容" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="~">
            <el-input v-model="inputTo" placeholder="请输入内容" size="medium"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleAutoGenerate">自动生成</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-input
          type="textarea"
          :rows="20"
          placeholder="格式:username,name,参考示例:testuser,testuser   多个用户请换行,一行一个"
          v-model="batchUsers">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchRegisterVisiable = false">取 消</el-button>
        <el-button type="primary" @click="handleBatchRegister" :loading="batchUsersLoading">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import NProgress from 'nprogress'
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
} from '@/api/user-role-permission'
import { register } from '../../api/user'
export default {
  data() {
    return {
      page: {
        index: 1,
        total: 0,
        size: 20,
        query: ''
      },
      filters: {
        name: ''
      },
      users: [],
      listLoading: false,
      resetLoading: false,
      sels: [], // 列表选中列
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      // 编辑界面数据
      editForm: {
        username: '',
        name: '',
        email: ''
      },
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      roleVisible: false,
      addFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      },
      // 新增界面数据
      addForm: {
        username: '',
        name: '',
        email: '',
        password: ''
      },
      nowId: -1,
      roleData: [],
      roleValue: [],
      roles: [],
      perRoleValue: [],
      batchRegisterVisiable: false,
      batchUsers:'',
      batchUsersProgress:0,
      batchUsersLoading: false,
      batchUsersShowResult: false,
      batchUsersLog: '',
      checkList: [],
      inputFront:'',
      inputBack:'',
      inputLength: 0,
      inputFrom:0,
      inputTo:0

    }
  },
  mounted() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    // 获取用户列表
    getUsers() {
      this.listLoading = true
      // NProgress.start();
      getUserList(this.page.index, this.page.size, this.page.query).then(res => {
        this.page.total = res.data.totalElements
        this.users = res.data.content
        this.listLoading = false
        // console.log( res.etxra);
        // NProgress.done();
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: '用户列表加载失败'
        })
      })
    },
    // 删除
    handleDel: function(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          // NProgress.start();
          // console.log(row)
          removeUser([row.id])
            .then(res => {
              this.listLoading = false
              // NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getUsers()
            })
            .catch(err => {
              this.listLoading = false
              // console.log(err.response)
            })
        })
        .catch(() => {})
    },
    // 显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      console.log(this.editForm)
    },
    // 显示新增界面
    handleAdd: function() {
      this.addFormVisible = true
      this.addForm = {
        password: '123456',
        level: 10000,
        username: '',
        email: ''
      }
    },
    handleReset: function(index, row) {
      this.$confirm('确认重置该用户密码?', '提示', {
        type: 'warning'
      })
        .then(() => {
          // NProgress.start();
          // console.log(row)
          resetUser(row.id)
            .then(res => {
              // NProgress.done();
              this.$message({
                message: '重置成功',
                type: 'success'
              })
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: '重置密码失败'
              })
            })
        })
        .catch(() => {})
    },

    flushRole: function() {
      this.roleData = []
      for (var x in this.roles) {
        // console.log(this.permission[x])
        this.roleData.push({
          key: this.roles[x].id,
          label: this.roles[x].name
        })
      }
      this.roleValue = []
    },
    getRoles: function() {
      getRoleList(-1, -1, 'no page').then(res => {
        this.roles = res.data
      })
    },
    handleRole: function(index, row) {
      this.roleVisible = true
      this.getRoles()
      this.flushRole()
      this.nowId = row.id

      getUserRole(row.id)
        .then(res => {
          this.roleValue = res.data
          this.perRoleValue = res.data
        })
        .catch(err => {
          console.log(err.response)
          // this.$message({
          // 		message: err.response.msg,
          // 		type: 'fail'
          // 	});
        })
    },

    handleUpdateRole: function(index, row) {
      const del = []
      const add = []
      for (var x in this.perRoleValue) {
        var flag = false
        for (var y in this.roleValue) {
          if (this.perRoleValue[x] === this.roleValue[y]) {
            flag = true
            break
          }
        }
        if (!flag) {
          del.push(this.perRoleValue[x])
        }
      }
      for (var x in this.roleValue) {
        var flag = false
        for (var y in this.perRoleValue) {
          if (this.perRoleValue[y] === this.roleValue[x]) {
            flag = true
            break
          }
        }
        if (!flag) {
          add.push(this.roleValue[x])
        }
      }
      // console.log(del);
      // console.log(add);
      this.loading = true
      if (del.length > 0) {
        dropRoleFromUser(this.nowId, del).then(res => {
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }
      if (add.length > 0) {
        grantRoleToUser(this.nowId, add).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
      this.loading = false
      this.roleVisible = false
      this.getUsers()
    },

    // 编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start();
            const para = Object.assign({}, this.editForm)
            updateUser(para)
              .then(res => {
                this.editLoading = false
                // NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['editForm'].resetFields()
                this.editFormVisible = false
                this.getUsers()
              })
              .catch(err => {
                this.editLoading = false
                console.log(err.response)
              })
          })
        }
      })
    },
    // 新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            const para = Object.assign({}, this.addForm)
            addUser(para)
              .then(res => {
                this.editLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['addForm'].resetFields()
                this.addFormVisible = false
                this.getUsers()
                this.addLoading = false
              })
              .catch(err => {
                this.addLoading = false
                console.log(err.response)
              })
          })
        }
      })
    },
    selsChange: function(sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function() {
      var ids = this.sels.map(item => item.id)
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          // NProgress.start();

          // console.log(ids)
          // console.log(ids[id])
          removeUser(ids).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          }).catch(err => {
            console.log(err)
          })
          this.listLoading = false
        })
        .catch(() => {})
    },
    handleSearch: function() {
      this.getUsers()
    },
    handleCurrentChange: function(val) {
        this.page.index = val
        this.getUsers()
    },
    handleSizeChange: function(val) {
        this.page.size = val
        this.getUsers()
    },
    handleBatchRegister: function() {
      var log = ''
      var users = this.batchUsers.split('\n')
      this.batchUsersProgress = 0
      var total = users.length
      var now = 0
      var sc = 0
      this.batchUsersShowResult = true
      this.batchUsersLoading = true
      if(total == 0){
        this.$message({
          type: 'warning',
          message: '请输入用户基本信息'
        })
        return;
      }

      for(let ind in users) {
        if(users[ind].length == 0 || users[ind].indexOf(',') == -1){
          total--;
          if(now == total){
            this.batchUsersLog += '共' + total + '人,成功注册' + sc + '人\n'
            this.batchUsersLoading = false
            this.getUsers()
          }
          continue;
        }
        let p_user = users[ind].split(',')
        let _user = []
        _user.push(p_user[0].trim())
        _user.push(p_user[1].trim())
        if(_user.length!=2){
          log += 'user' + _user[0] + ' 格式错误,跳过注册\n'
          this.batchUsersLog = log;
          now = now + 1
          this.batchUsersProgress = Math.floor(now / total) * 100
          if(now == total){
            this.batchUsersLog += '共' + total + '人,成功注册' + sc + '人\n'
            this.batchUsersLoading = false
            this.getUsers() 
          }
          continue
        }
        else if(_user[0].length<6){
          log += 'user' + _user[0] + ' username小于6位,跳过注册\n'
          this.batchUsersLog = log;
          now = now + 1
          this.batchUsersProgress = Math.floor(now / total) * 100
          if(now == total){
            this.batchUsersLog += '共' + total + '人,成功注册' + sc + '人\n'
            this.batchUsersLoading = false
            this.getUsers() 
          }
          continue
        }
        addUser({
          username: _user[0],
          name: _user[1],
          email: 'example@example.com',
          password: '123456',
          level:1000
        }).then( res =>{
          log += 'user' + _user[0] + ' 注册成功\n'
          now = now + 1
          sc = sc + 1
          this.batchUsersProgress = Math.floor(now / total) * 100
          this.batchUsersLog = log
          if(now == total){
            this.batchUsersLog += '共' + total + '人,成功注册' + sc + '人\n'
            this.batchUsersLoading = false
            this.getUsers()
          }
        }).catch( err =>{
          log += 'user' + _user[0] + ' ' + err.message + '\n'
          now = now + 1
          this.batchUsersProgress = Math.floor(now / total) * 100
          this.batchUsersLog = log
          if(now == total){
            this.batchUsersLog += '共' + total + '人,成功注册' + sc + '人\n'
            this.batchUsersLoading = false
            this.getUsers() 
          }
        })
      }
    },
    handleAutoGenerate:function() {
      this.batchUsers = ''
      var haveFront = false
      var haveBack = false
      var haveLength = false
      for(let ind in this.checkList){
        if(this.checkList[ind] == '前缀'){
          haveFront = true
        }
        if(this.checkList[ind] == '后缀'){
          haveBack = true
        }
        if(this.checkList[ind] == '数值区补齐长度'){
          haveLength = true
          let realLength = this.inputTo.toString().length
          if(realLength > parseInt(this.inputLength)){
            this.$message({
              type: 'error',
              message: '补齐长度小于实际长度,请重新输入'
            })
            return;
          }
        }
      }
      for(let ind = this.inputFrom; ind <= this.inputTo; ind++){
        var _tp = ind.toString()
        if(haveLength){
          while(_tp.length < this.inputLength){
            _tp = '0' + _tp
          }
        }
        if(haveFront){
          _tp = this.inputFront + _tp
        }
        if(haveBack){
          _tp = _tp + this.inputBack
        }
        this.batchUsers += _tp + ',' + _tp + (ind == this.inputTo ? '' : '\n')
      }
    }
  }
}
</script>

<style scoped>
.bodybox{
  margin-top: 20px;
}
.el-col{
    border: 1px solid transparent;
}
</style>
