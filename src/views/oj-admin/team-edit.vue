<template>
    <div class="app-container teamedit">
        <el-card>
            {{ team.name }}
        </el-card>
        <el-row :gutter="20" class="bodybox">
            <el-col :span="18" :xs="24">
                <el-card>
                    <h2>训练:</h2>
                    <router-link :to="'teamcontest/add?teamId=' + teamId">添加训练</router-link>
            <el-divider></el-divider>
            <center>
                <el-table :data="team.contests" style="width: 100%">
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <div :class='statuClass(scope.row.runStatu)'>
                            {{scope.row.runStatu}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="比赛名称" width="300">
                    <template slot-scope="scope">
                        <div class="titleFont">
                            {{scope.row.title}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="时长" width="150">
                    <template slot-scope="scope">
                        <div class="timeFont">
                            {{timeLength(scope.row.length)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="起止时间" width="300">
                    <template slot-scope="scope">
                        <el-tag effect="plain" type="info" size="medium">{{ scope.row.normalStartTime + '--' + scope.row.normalEndTime }}</el-tag>
                    </template>
                </el-table-column>
               <el-table-column align="right">
                    <template slot-scope="scope">
                    <el-button type="warning" plain size="small" @click="handleUpdate(scope.row.id)">update</el-button>
                    </template>
              </el-table-column>
                </el-table>
            </center>
                </el-card>
            </el-col>
            <el-col :span="6" :xs="24">
                <!-- 加入配置 -->
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>设置</span>
                    </div>
                    <div>
                        <el-switch
                        v-model="ispublic"
                        active-text="Public"
                        inactive-text="Private"
                        @change="handleAttendChange">
                        </el-switch>
                        <br/><br/>
                        <div>邀请码: {{ inviteCode }}</div>
                    </div>
                </el-card>
                <!-- 显示成员 -->
                <el-card class="nextCard">
                    <div slot="header" class="clearfix">
                        <span>成员</span>
                    </div>
                    <div v-for="(item, key) in team.teammates" :key="key">
                        <div class="teammatebox"> 
                            <div class="teammatename">
                                {{ item.user.username }} 
                            </div>
                            <div v-if="item.level == 0" class="teammatetag">
                                <el-tag effect="plain" size="mini" type="warning">master</el-tag>
                            </div>
                            <div v-else class="teammatetag">
                                <el-tag size="mini" type="danger" @click="handleMoveOut(item.id)">移出队伍</el-tag>
                            </div>
                            <br/>
                        </div>
                    </div>
                </el-card>
                <!-- 显示入队申请 -->
                <el-card class="nextCard">
                    <div slot="header" class="clearfix">
                        <span>申请</span>
                        <span>
                            <el-button @click="onlyShowActive = !onlyShowActive">{{ applyButtonText }}</el-button>
                        </span>
                    </div>
                    <div v-for="(item, key) in activeapply" :key="key">
                        <div class="teammatebox">
                            <div class="teammatename">
                                {{ item.user.username }} 
                            </div>
                            <div class="teammatetag">
                                <el-tag size="mini" type="success" @click="applyApproveTeam(item.id)">同意</el-tag>
                                <el-tag size="mini" type="danger" @click="applyRejectTeam(item.id)">拒绝</el-tag>
                            </div>
                            <br/>
                        </div>
                    </div>
                    <div v-if="onlyShowActive == false">
                        <el-divider></el-divider>
                        <div v-for="(item, key) in disactiveapply" :key="key">
                        <div class="teammatebox">
                            <div class="teammatename">
                                {{ item.user.username }} 
                            </div>
                            <div class="teammatetag">
                                <div v-if="item.result == 'approved'">
                                    <el-tag size="mini" type="success">已同意</el-tag>
                                </div>
                                <div v-else>
                                    <el-tag size="mini" type="danger">已拒绝</el-tag>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { param2Obj, calTime } from '@/utils'
import { getTeamById, updateTeamAttend, getInviteCode, moveoutTeammate, showapply, agreeApply, disagreeApply } from '@/api/team'
export default {
    name: 'TeamEdit',
    data(){
        return {
            teamId: -1,
            team: {},
            ispublic: false,
            inviteCode: '',
            activeapply: [],
            disactiveapply: [],
            onlyShowActive: true
        }
    },
    computed:{
        applyButtonText: function() {
            if(this.onlyShowActive){
                return '显示已处理'
            }
            else{
                return '隐藏已处理'
            }
        }
    },
    mounted(){
        let obj = param2Obj(window.location.href)
        if(obj == null || obj.teamId == null){
            this.$message({
                type:'error',
                message: '非法进入管理页面'
            })
            return
        }
        getTeamById(obj.teamId).then( res => {
            this.teamId = obj.teamId
            this.team = res.data
            this.ispublic = this.team.attend == 'public'
            getInviteCode(this.teamId).then( res => {
                this.inviteCode = res.data
            }).catch( err => {
                this.$message({
                    type:'error',
                    message: err.message
                })
            })
            this.flushApply()
        }).catch(err => {
            this.$message({
                type:'error',
                message: err.message
            })
            return
        })
        

    },
    methods: {
        handleMoveOut: function(teammateId){
            moveoutTeammate(teammateId).then( res => {
                this.$message({
                    type: 'success',
                    message: '移除成功'
                })
                
                //刷新成员列表
                var temp = []
                for(let i = 0; i < this.team.teammates.length; i++) {
                    if(this.team.teammates[i].id != teammateId){
                        temp.push(this.team.teammates[i])
                    }
                }
                this.team.teammates = temp

            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleAttendChange: function() {
            updateTeamAttend(this.teamId, this.ispublic ? "public" : "private").then( res => {
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        flushApply: function() {
            showapply(this.teamId).then( res => {
                this.activeapply = []
                this.disactiveapply = []
                for(let i = 0; i < res.data.length; i++) {
                    if(res.data[i].active == 'true'){
                        this.activeapply.push(res.data[i])
                    }
                    else{
                        this.disactiveapply.push(res.data[i])
                    }
                }
                
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        applyApproveTeam: function(applyId) {
            agreeApply(applyId).then( res => {
                this.$message({
                    type: 'success',
                    message: '操作成功,已同意'
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        applyRejectTeam: function(applyId) {
            disagreeApply(applyId).then( res => {
                this.$message({
                    type: 'success',
                    message: '操作成功,已拒绝'
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        statuClass: function(statu){
            if(statu=='已结束'){
                return 'statuFont statuEndFont'
            }
            else if(statu=='进行中'){
                return 'statuFont statuRunningFont'
            }
            else{
                return 'statuFont statuWaitingFont'
            }
        },
        timeLength: function(time){
            return calTime(Number(time)*60)
        },
        handleUpdate: function(id){
            this.$router.push('/ojAdmin/contest/edit/' + id)
        }

    },
    
}
</script>
<style scoped>
.bodybox{
    margin-top: 20px;
}
.nextCard{
    margin-top: 20px;
}
.teamedit .teammatebox{
    margin-top: 20px;
}

.teamedit .teammatename{
    float: left;
    margin-left: 20px;
    clear: both;
    font-size: 18px;
}
.teamedit .teammatetag{
    float: left;
    margin-left: 20px;
    cursor: pointer;
}

.teamedit .teammatetag span{
    margin-left: 5px;
}
</style>

