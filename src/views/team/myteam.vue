<template>
    <div class="app-container teamBox">
        
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple" ><router-link :to="'/team/all'">所有队伍</router-link></div></el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple">
                    <center><h1>我的队伍</h1></center>
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
    </div>
</template>
<script>
import { getMyTeams } from '@/api/team'

export default {
    name: 'Myteam',
    data(){
        return{
            tableData: [{
                attend: "private",
                createTime: "2020-07-30T12:45:33Z",
                creator: {id: 50, username: "bnc1010", name: "bnc", userProfile: {id: 50, score: 5, accepted: 1, submitted: 3}},
                description: "这是一个测试队伍",
                id: 2,
                name: "testTeam",
                normalCreateTime: "2020-07-30 20:45"
            }],
            page:{
                index:1,
                size:20,
                total:0,
                query:''
            },
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
                console.log(res)
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