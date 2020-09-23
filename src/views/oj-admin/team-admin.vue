<template>
    <div class="app-container teamBox">
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-input v-model="page.query" placeholder="搜索队伍" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
                    </el-input>
                </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
              <el-button type="primary" plain @click="handleAdd">新建队伍</el-button>
            </div></el-col>
            </el-row>
        </el-card>
        <el-card class="bodybox contestBox">
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
            <el-divider></el-divider>
            <center>
                <el-table :data="tableData" style="width: 100%">
                <el-table-column label="id" width="100">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="队伍名" width="200">
                    <template slot-scope="scope">
                        <div class="titleFont">
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="类型" width="150">
                    <template slot-scope="scope">
                        <el-tag effect="dark" class="tagboard" :color="privilegeTagColor(scope.row.attend)" size="mini">{{ scope.row.attend }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="300">
                    <template slot-scope="scope">
                        <el-tag effect="plain" type="info" size="medium">{{ scope.row.normalCreateTime }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建者" width="150">
                    <template slot-scope="scope">
                        {{ scope.row.creator.username }}
                    </template>
                </el-table-column>
                <el-table-column width="150">
                    <template slot-scope="scope">
                        <el-button type="warning" plain size="small" @click="handleUpdate(scope.row.id)">管理</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </center>
            <el-divider></el-divider>
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
        </el-card>

        <el-dialog title="新建队伍" :visible.sync="addFormVisible" :append-to-body="true">
        <el-form ref="addForm" :model="addForm" label-width="80px">
          <el-form-item label="队伍名" prop="name">
            <el-input v-model="addForm.name" auto-complete="off" />
          </el-form-item>
          <el-form-item label="简介" prop="level">
            <el-input v-model="addForm.description" auto-complete="off" />
          </el-form-item>
          <el-form-item label="类型" prop="attend">
            <el-select v-model="addForm.attend" placeholder="请选择">
                <el-option label="private" value="private"></el-option>
                <el-option label="public" value="public"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false, addLoading = false">取消</el-button>
          <el-button type="primary" :loading="addLoading" @click.native="submitAddTeam">提交</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { getTeams, createTeam } from '@/api/team'
export default {
    name: 'TeamAdmin',
    data(){
        return{
            page:{
                index:1,
                size:20,
                total:0,
                query:''
            },
            tableData:[],
            addFormVisible: false,
            addLoading: false,
            addForm:{
                name: '',
                description: '',
                attend: ''
            }
        }
    },
    mounted(){
        this.flushTeam()
    },
    methods:{
        handleSizeChange: function(val){
            this.page.size=val
            this.flushTeam()
        },
        handleCurrentChange: function(val){
            this.page.index=val
            this.flushTeam()
        },
        handleSearch: function(){

        },
        handleAdd: function() {
            this.addFormVisible = true
        },
        flushTeam: function(){
            getTeams(this.page.index, this.page.size).then( res => {
                this.tableData = res.data.content
                this.page.total = res.data.totalElements
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        privilegeTagColor: function(privilege){
            if(privilege=='public'){
                return '#99CC00'
            }
            else if(privilege=='private'){
                return '#CC3333'
            }
            else {
                return '#409EFF'
            }
        },
        submitAddTeam: function(){
            if(this.addForm.name.length<1 || this.addForm.description.length<1){
                this.$message({
                    type: 'error',
                    message: '队伍名或简介未填写'
                })
                return
            }
            if(this.addForm.attend != 'private' && this.addForm.attend != 'public'){
                this.$message({
                    type: 'error',
                    message: '队伍类型未选择'
                })
                return
            }
            this.addLoading = true
            createTeam(this.addForm).then( res => {
                this.addLoading = false
                this.$message({
                    type: 'success',
                    message: '新建成功'
                })
                this.addFormVisible = false
                this.flushTeam()

            }).catch( err => {
                this.addLoading = false
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleUpdate: function(teamId){
            this.$router.push('./teamedit?teamId=' + teamId)
        }
    }
}
</script>
<style scoped>
.bodybox{
    margin-top: 20px;
}

.teamBox .titleFont{
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
.el-col{
    border: 1px solid transparent;
}
</style>