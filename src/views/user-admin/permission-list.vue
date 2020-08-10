<template>
  <div class="app-container">
    <section>
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
          :data="permissions"
          highlight-current-row
          v-loading="loading"
          style="width: 100%;"
        >
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="pId" label="ID" width="80" sortable></el-table-column>
          <el-table-column prop="pName" label="权限名"></el-table-column>
          <el-table-column prop="pUrl" label="权限表达式"></el-table-column>
          <el-table-column prop="pType" label="权限类型" width="100" sortable></el-table-column>
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
	  <!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :append-to-body="true">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="权限名" prop="pName">
					<el-input v-model="addForm.pName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="表达式" prop="pUrl">
					<el-input v-model="addForm.pUrl" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限类型" prop="pType">
					<el-input v-model="addForm.pType" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false, addLoading = false">取消</el-button>
				<el-button type="primary" @click.native="submitAddPermission" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
<!-- 编辑界面 -->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="权限名" prop="pName">
					<el-input v-model="editForm.pName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="表达式" prop="pUrl">
					<el-input v-model="editForm.pUrl" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限类型" prop="pType">
					<el-input v-model="editForm.pType" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false, editLoading = false">取消</el-button>
				<el-button type="primary" @click.native="submitEditPermission" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
    </section>
  </div>
</template>



<script>
import {
  getPermissionList,
  addPermission,
  deletePermission,
  editPermission,
} from "@/api/user-role-permission";
import router from "../../router";
import { setToken } from "@/utils/auth";
import BackToTop from "@/components/BackToTop";
export default {
  components: { BackToTop },
  data() {
    return {
      filters: {
        name: "",
      },
      loading: false,
      permissions: [],
      addFormVisible: false,
      addForm: {
        pId: "",
        pName: "",
        pUrl: "",
        pType: "",
      },
      addLoading: false,
      editForm: {
        pId: "",
        pName: "",
        pUrl: "",
        pType: "",
      },
      editFormVisible: false,
      editLoading: false,
    };
  },
  methods: {
    //获取角色列表
    getPermission: function () {
      let para = {
        name: this.filters.name,
      };
      this.loading = true;
      getPermissionList()
        .then((res) => {
          this.permissions = res.data;
          this.loading = false;
        })
        .catch((err) => {
          if (err.response.data.code === 403) {
            router: router.push("/401");
          }
          this.$message({
            message: err.response.data.msg,
            type: "error",
          });
        });
    },

    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        pId: "",
        pName: "",
        pUrl: "",
        pType: "",
      };
    },

    handleDelete: function (index, row) {
      this.$confirm("删除后相关角色将失去该权限，确认删除该权限吗?", "提示", {
        type: "warning",
      }).then(() => {
        deletePermission(row.pId)
          .then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getPermission();
          })
          .catch((err) => {
            this.$message({
              message: err.response.data.msg,
              type: "error",
            });
          });
      });
    },
    submitAddPermission: function () {
      if (
        this.addForm.pName == "" ||
        this.addForm.pUrl == "" ||
        this.addForm.pType == ""
      ) {
        this.$message({
          message: "信息不完整",
          type: "error",
        });
        return;
      }
      this.addLoading = true;
      addPermission(this.addForm)
        .then((res) => {
          // console.log(res);
          setToken(res.data);
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.addFormVisible = false;
          this.getPermission();
        })
        .catch((err) => {
          this.addLoading = false;
          // console.log(err);
        });
      this.addLoading = false;
    },
    handleEdit(index, row) {
      this.editForm = {
        pId: row.pId,
        pName: row.pName,
        pUrl: row.pUrl,
        pType: row.pType,
      };
      this.editFormVisible = true;
    },
    submitEditPermission: function () {
      if (
        this.editForm.pName == "" ||
        this.editForm.pUrl == "" ||
        this.editForm.pType == ""
      ) {
        this.$message({
          message: "信息不完整",
          type: "error",
        });
        return;
      }
      this.editLoading = true;
      editPermission(this.editForm)
        .then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.editFormVisible = false;
          this.getPermission();
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.msg,
            type: "error",
          });
        });
      this.editLoading = false;
    },
  },
  mounted() {
    this.getPermission();
  },
};
</script>

<style scoped>
</style>
