<template>
    <div class="app-container teamBox">
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple" >
                        <router-link :to="'/team/myteam'">我的队伍</router-link>
                        <el-button plain size="mini" @click="joinDialogVisible = true">加入队伍</el-button>
                    </div>
                </el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple">
                    <center><h1>队伍列表</h1></center>
                </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
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
                <el-table-column  width="150">
                    <template slot-scope="scope">
                        <el-button  @click="handleApply(scope.row.id)" :disabled="scope.row.attend == 'private'">申请加入</el-button>
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
            title="加入队伍"
            :visible.sync="joinDialogVisible"
            width="30%">
            <span>
                <el-input v-model="inviteCode" placeholder="请输入队伍邀请码"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="joinDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleJoinTeam">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getTeams, joinTeamByCode, applyTeam } from '@/api/team'

export default {
    name: 'AllTeam',
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
        handleJoinTeam: function(){
            joinTeamByCode(this.inviteCode).then( res => {
                this.$message({
                    type: 'success',
                    message: '加入成功'
                })
                // 跳转到刚加入的比赛详情页
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
            this.joinDialogVisible = false
        },
        handleApply: function(teamId) {
            applyTeam(teamId).then( res => {
                this.$message({
                    type: 'success',
                    message: '申请成功'
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
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
</style>