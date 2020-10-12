<template>
  <div class="app-container">
    <el-card>
      <!--工具条-->
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="page.query" placeholder="搜索角色" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><el-button type="primary" plain @click="handleAdd">新建角色</el-button></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
      </el-row>
    </el-card>
    <el-card class="Box">
      <template>
        <el-table v-loading="loading" :data="roles" highlight-current-row style="width: 100%;">
          <el-table-column prop="id" label="ID" width="120" sortable />
          <el-table-column prop="name" label="角色名" />
          <el-table-column prop="level" label="等级" sortable />
          <el-table-column prop="type" label="类型(r:root,a:admin,c:common)" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
                <svg-icon icon-class="edit" />
              </el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">
                <i class="el-icon-delete" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-divider></el-divider>
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
    </el-card>
    <el-dialog :visible.sync="permissionVisible" :append-to-body="true">
        <div style="text-align: center">
          <el-transfer
            v-model="value"
            style="text-align: left; display: inline-block"
            :data="data"
            :titles="['未有权限', '已有权限']"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="permissionVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdatePermission();">提 交</el-button>
        </span>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body="true">
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="角色名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="等级" prop="level">
            <el-input v-model="addForm.level" auto-complete="off" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="addForm.type" auto-complete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false, addLoading = false">取消</el-button>
          <el-button type="primary" :loading="addLoading" @click.native="submitAddRole">提交</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {
  getRoleList,
  getPermissionList,
  getPermissionByRId,
  dropPermissionFromRole,
  grantPermissionToRole,
  addRole,
  deleteRole
} from '@/api/user-role-permission'
// import NProgress from 'nprogress'
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
      loading: false,
      roles: [],
      permissionVisible: false,
      permission: [],
      data: [],
      value: [],
      perValue: [],
      nowId: -1,
      access: 1,
      addForm: {
        type: '',
        level: 1000,
        name: ''
      },
      addFormVisible: false,
      addLoading: false
    }
  },

  mounted() {
    this.getRole()
    this.getPermission()
  },
  methods: {
    // 获取角色列表
    getRole: function() {
      const para = {
        name: this.filters.name
      }
      this.loading = true
      getRoleList(this.page.index, this.page.size, this.page.query)
        .then(res => {
          this.roles = res.data.content
          this.page.total = res.data.totalElements
          this.loading = false
        })
        .catch(err => {
          if (err.response.data.code === 403) {
            router.push('/401')
          }
          console.log(err.response)
        })
    },
    getPermission: function() {
      this.loading = true
      getPermissionList()
        .then(res => {
          this.permission = res.data
          this.flushPermission()
          this.loading = false
        })
        .catch(err => {
          console.log(err.response.data)
          var msg = ''
          if (err.response.data.code === 403) {
            msg = 'read only'
          } else {
            msg = err.response.data.msg
          }
          this.$message({
            message: msg,
            type: 'warning'
          })
          this.access = 0
        })
    },
    getOwnPermission: function(rId) {
      getPermissionByRId(rId)
        .then(res => {
          this.listLoading = false
          // NProgress.done();
          this.perValue = res.data
          this.value = res.data
        })
        .catch(err => {
          this.$message({
            message: msg,
            type: 'warning'
          })
          this.listLoading = false
          // console.log(err.response)
        })
    },
    flushPermission: function() {
      // console.log(this.permission);
      for (var x in this.permission) {
        // console.log(this.permission[x])
        this.data.push({
          key: this.permission[x].id,
          label: this.permission[x].name
        })
      }
      this.value = []
    },
    handleAdd: function() {
      if (this.access == 0) {
        this.$message({
          message: '无权编辑角色',
          type: 'error'
        })
      } else {
        this.addFormVisible = true
        this.addForm = {
          type: '',
          level: 1000,
          name: ''
        }
      }
    },
    handleEdit: function(index, row) {
      if (this.access == 0) {
        this.$message({
          message: '无权编辑角色',
          type: 'error'
        })
      } else {
        this.nowId = row.id
        this.getOwnPermission(row.id)
        this.permissionVisible = true
      }
    },
    handleUpdatePermission: function() {
      const del = []
      const add = []
      for (var x in this.perValue) {
        var flag = false
        for (var y in this.value) {
          if (this.perValue[x] == this.value[y]) {
            flag = true
            break
          }
        }
        if (!flag) {
          del.push(this.perValue[x])
        }
      }
      for (var x in this.value) {
        var flag = false
        for (var y in this.perValue) {
          if (this.perValue[y] == this.value[x]) {
            flag = true
            break
          }
        }
        if (!flag) {
          add.push(this.value[x])
        }
      }
      // console.log(del);
      // console.log(add);
      this.loading = true
      if (del.length > 0) {
        dropPermissionFromRole(this.nowId, del)
          .then(res => {
            // NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch(err => {
            this.$message({
              message: err.response.msg,
              type: 'error'
            })
          })
      }
      if (add.length > 0) {
        grantPermissionToRole(this.nowId, add)
          .then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          })
          .catch(err => {
            this.$message({
              message: '赋权限失败',
              type: 'erroe'
            })
          })
      }
      this.loading = false

      this.permissionVisible = false
    },
    handleDel: function(index, row) {
      this.$confirm('删除后相关用户将失去该角色，确认删除该角色吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          deleteRole(row.id)
            .then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getRole()
            })
            .catch(err => {
              this.$message({
                message: err.response.data.msg || '删除失败',
                type: 'error'
              })
            })
        })
        .catch(() => {
          this.$message({
            message: '',
            type: 'warning'
          })
        })
    },
    submitAddRole: function() {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.addLoading = true
        addRole(this.addForm.name, this.addForm.type, this.addForm.level)
          .then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          })
          .catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: 'error'
            })
          })
        this.addLoading = false
        this.addFormVisible = false
        this.getRole()
      })
    },
    handleSearch: function() {
      this.getRole()
    },
    handleCurrentChange: function(val) {
        this.page.index = val
        this.getRole()
    },
    handleSizeChange: function(val) {
        this.page.size = val
        this.getRole()
    },
  }
}
</script>

<style scoped>
.Box{
  margin-top: 20px;
}
.el-col{
    border: 1px solid transparent;
}
</style>
