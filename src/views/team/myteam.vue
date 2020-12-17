<template>
    <div class="app-container teamBox">
        <el-card>
            <el-row :gutter="20">
                <el-col :span="9"><div class="grid-content bg-purple" /></el-col>
                <el-col :span="4">
                <div class="grid-content bg-purple">
                    <center><h1>我的学生组</h1></center>
                </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-top:25px">
                        <el-button type="primary" plain size="mini" @click="joinDialogVisible = true">加入学生组</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="bodybox contestBox">
            <el-divider></el-divider>
            <center>
                <el-table :data="tableData" style="width: 100%">
                <el-table-column label="id" width="100">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="学生组名" width="200">
                    <template slot-scope="scope">
                        <div class="titleFont">
                            <router-link :to="'./detail?teamId=' + scope.row.id">{{scope.row.name}}</router-link>
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
        <el-dialog
            title="加入学生组"
            :visible.sync="joinDialogVisible"
            width="30%">
            <span>
                <el-input v-model="inviteCode" placeholder="请输入学生组邀请码"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="joinDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleJoinTeam">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getMyTeams, joinTeamByCode } from '@/api/team'

export default {
    name: 'Myteam',
    data(){
        return{
            tableData: [],
            page:{
                index:1,
                size:20,
                total:0,
                query:''
            },
            joinDialogVisible: false,
            inviteCode: ''
        }
    },
    mounted(){
        this.flushMyTeam()
    },
    methods:{
        handleSizeChange: function(val){
            this.page.size=val
            // this.flushContestList()
        },
        handleCurrentChange: function(val){
            this.page.index=val
            // this.flushContestList()
        },
        flushMyTeam: function(){
            getMyTeams(this.page.index, this.page.size).then( res => {
                this.tableData = res.data.teams
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
        handleJoinTeam: function(){
            joinTeamByCode(this.inviteCode).then( res => {
                this.$message({
                    type: 'success',
                    message: '加入成功'
                })
                this.$router.push('./detail?teamId=' + res.data)
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
            this.joinDialogVisible = false
        },
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