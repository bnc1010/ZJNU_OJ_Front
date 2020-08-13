<template>
  <div class="app-container">
    <el-card>
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-button type="primary" @click="addFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <template>
        <el-table
          v-loading="loading"
          :data="permissions"
          highlight-current-row
          style="width: 100%;"
        >
          <el-table-column prop="id" label="ID" width="80" sortable />
          <el-table-column prop="name" label="权限名" width="250" />
          <el-table-column prop="url" label="权限表达式" width="250" />
          <el-table-column prop="type" label="权限类型" width="120" sortable />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">
                <svg-icon icon-class="edit" />
              </el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body="true">
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="权限名" prop="pName">
            <el-input v-model="addForm.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="表达式" prop="pUrl">
            <el-input v-model="addForm.url" auto-complete="off" />
          </el-form-item>
          <el-form-item label="权限类型" prop="pType">
            <el-input v-model="addForm.type" auto-complete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false, addLoading = false">取消</el-button>
          <el-button type="primary" :loading="addLoading" @click.native="submitAddPermission">提交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑界面 -->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="权限名" prop="pName">
            <el-input v-model="editForm.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="表达式" prop="pUrl">
            <el-input v-model="editForm.url" auto-complete="off" />
          </el-form-item>
          <el-form-item label="权限类型" prop="pType">
            <el-input v-model="editForm.type" auto-complete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false, editLoading = false">取消</el-button>
          <el-button type="primary" :loading="editLoading" @click.native="submitEditPermission">提交</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionList,
  addPermission,
  deletePermission,
  editPermission
} from '@/api/user-role-permission'
import router from '../../router'
import { setToken } from '@/utils/auth'
import BackToTop from '@/components/BackToTop'
export default {
  components: { BackToTop },
  data() {
    return {
      filters: {
        name: ''
      },
      loading: false,
      permissions: [],
      addFormVisible: false,
      addForm: {
        id: '',
        name: '',
        url: '',
        type: ''
      },
      addLoading: false,
      editForm: {
        id: '',
        name: '',
        url: '',
        type: ''
      },
      editFormVisible: false,
      editLoading: false
    }
  },
  mounted() {
    this.getPermission()
  },
  methods: {
    // 获取角色列表
    getPermission: function() {
      const para = {
        name: this.filters.name
      }
      this.loading = true
      getPermissionList()
        .then((res) => {
          this.permissions = res.data
          this.loading = false
        })
        .catch((err) => {
          if (err.response.data.code === 403) {
            router.push('/401')
          }
          this.$message({
            message: err.response.data.msg,
            type: 'error'
          })
        })
    },

    handleAdd: function() {
      this.addFormVisible = true
      this.addForm = {
        id: '',
        name: '',
        url: '',
        type: ''
      }
    },

    handleDelete: function(index, row) {
      this.$confirm('删除后相关角色将失去该权限，确认删除该权限吗?', '提示', {
        type: 'warning'
      }).then(() => {
        deletePermission(row.id)
          .then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getPermission()
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.msg,
              type: 'error'
            })
          })
      })
    },
    submitAddPermission: function() {
      if (
        this.addForm.name == '' ||
        this.addForm.url == '' ||
        this.addForm.type == ''
      ) {
        this.$message({
          message: '信息不完整',
          type: 'error'
        })
        return
      }
      this.addLoading = true
      addPermission(this.addForm)
        .then((res) => {
          // console.log(res);
          setToken(res.data)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.addFormVisible = false
          this.getPermission()
        })
        .catch((err) => {
          this.addLoading = false
          // console.log(err);
        })
      this.addLoading = false
    },
    handleEdit(index, row) {
      this.editForm = {
        id: row.id,
        name: row.name,
        url: row.url,
        type: row.type
      }
      this.editFormVisible = true
    },
    submitEditPermission: function() {
      if (
        this.editForm.name == '' ||
        this.editForm.url == '' ||
        this.editForm.type == ''
      ) {
        this.$message({
          message: '信息不完整',
          type: 'error'
        })
        return
      }
      this.editLoading = true
      editPermission(this.editForm)
        .then((res) => {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.editFormVisible = false
          this.getPermission()
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.msg,
            type: 'error'
          })
        })
      this.editLoading = false
    }
  }
}
</script>

<style scoped>
</style>
