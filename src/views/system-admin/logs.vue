<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="20" :xs="24">
                <el-card>
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="api">
                            <el-input placeholder="api" v-model="page.url"></el-input>
                        </el-form-item>
                        <el-form-item label="ip">
                            <el-input placeholder="ip" v-model="page.ip"></el-input>
                        </el-form-item>
                        <el-form-item label="起始时间">
                            <div class="block">
                                <el-date-picker
                                v-model="page.startTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="终止时间">
                            <div class="block">
                                <el-date-picker
                                v-model="page.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="用户id">
                            <el-input placeholder="用户id" v-model="page.userId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
                <el-tabs class="Box" tab-position="left" @tab-click="handleTabClick" v-model="activeName">
                    <el-tab-pane label="普通日志" name="commonLog">
                        <el-card>
                            <el-table :data="commonLog">
                                <el-table-column label="api">
                                    <template slot-scope="scope">
                                        {{ scope.row.url }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="ip">
                                    <template slot-scope="scope">
                                        {{ scope.row.ip }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="时间">
                                    <template slot-scope="scope">
                                        {{ scope.row.normalTime }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="用户id">
                                    <template slot-scope="scope">
                                        {{ scope.row.userId == null ? '-' : scope.row.userId }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="结果">
                                    <template slot-scope="scope">
                                        {{ scope.row.result }}
                                    </template>
                                </el-table-column>
                            </el-table>
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
                    </el-tab-pane>
                    <el-tab-pane label="管理日志" name="adminLog">
                        <el-card>
                            <el-table :data="adminLog">
                                <el-table-column label="api">
                                    <template slot-scope="scope">
                                        {{ scope.row.url }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="ip">
                                    <template slot-scope="scope">
                                        {{ scope.row.ip }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="时间">
                                    <template slot-scope="scope">
                                        {{ scope.row.normalTime }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="用户id">
                                    <template slot-scope="scope">
                                        {{ scope.row.userId == null ? '-' : scope.row.userId }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="结果">
                                    <template slot-scope="scope">
                                        {{ scope.row.result }}
                                    </template>
                                </el-table-column>
                            </el-table>
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
                    </el-tab-pane>
                </el-tabs>
                
            </el-col>
            <el-col :span="4" :xs="24">
                <el-card>
                    <el-form>
                        <el-form-item label="用户id">
                            <el-input v-model="searchUserId"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearchUser">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import { getCommonLog, getAdminLog } from '@/api/log'
import { getUserById } from '@/api/user-role-permission'


export default {
    name:"SystemLogs",
    data(){
        return {
            page:{
                index:1,
                size:20,
                total:-1,
                ip: '',
                url: '',
                startTime: '',
                endTime: '',
                userId: '',
            },
            activeName: 'commonLog',
            commonLog: [],
            adminLog: [],
            searchUserId: ''
        }
    },
    mounted(){
        this.activeName = 'commonLog'
        this.flushLogList()
    },
    methods:{
        handleTabClick: function(tab, event){
            this.page = {
                index:1,
                size:20,
                total:-1,
                ip: '',
                url: '',
                startTime: '',
                endTime: '',
                userId: '',
            }
            this.activeName = tab.name
            this.flushLogList()
        },
        flushLogList: function() {
            if(this.activeName == 'commonLog'){
                this.adminLog.length = 0
                getCommonLog(this.page.index, this.page.size, this.page.ip, this.page.url, this.page.startTime, this.page.endTime, this.page.userId).then( res => {
                    this.page.total = res.data.totalElements
                    this.commonLog = res.data.content
                }).catch( err => {
                    this.$message({
                        type:'error',
                        message: err.message
                    })
                })
            }
            else{
                this.commonLog.length = 0
                getAdminLog(this.page.index, this.page.size, this.page.ip, this.page.url, this.page.startTime, this.page.endTime, this.page.userId).then( res => {
                    this.page.total = res.data.totalElements
                    this.adminLog = res.data.content
                }).catch( err => {
                    this.$message({
                        type:'error',
                        message: err.message
                    })
                })
            }
        },
        handleCurrentChange: function(val) {
            this.page.index = val
            this.flushLogList()
            },
        handleSizeChange: function(val) {
            this.page.size = val
            this.flushLogList()
        },
        handleSearch: function() {
            this.flushLogList()
        },
        handleSearchUser: function(){
            getUserById(this.searchUserId).then( res => {
                this.$notify({
                    title: '查询结果',
                    message: '用户名:' + res.data.username + '\n姓名:' + res.data.name,
                    position: 'bottom-right',
                    duration: 0
                });
            }).catch( err => {
                this.$message({
                    type:'error',
                    message: err.message
                })
            })
        }
    },
        
}
</script>
<style scoped>
.Box{
    margin-top: 20px;
}
</style>