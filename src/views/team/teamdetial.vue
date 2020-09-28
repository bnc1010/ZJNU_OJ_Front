<template>
    <div class="app-container teamDetial">
        <el-card>
            {{ team.name }}
        </el-card>
        <el-row :gutter="20" class="bodybox">
            <el-col :span="18" :xs="24">
                <el-card>
                    <h2>训练:</h2>
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
                        <div class="titleFont" @click="handleEnterContest(scope.row.id)">
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
                </el-table>
            </center>
                </el-card>
            </el-col>
            <el-col :span="6" :xs="24">
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
                            <br/>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { param2Obj, calTime } from '@/utils'
import { contestGate } from '@/api/contest'
import { getTeamById } from '@/api/team'
export default {
    name: "TeamDetial",
    data(){
        return {
            teamId: -1,
            team: {},
            ispublic: false,
            currentContestId: -1,
            currentContestId: '' 
        }
    },
    mounted(){
        let obj = param2Obj(window.location.href)
        if(obj == null || obj.teamId == null){
            this.$message({
                type:'error',
                message: '参数错误'
            })
            return
        }
        getTeamById(obj.teamId).then( res => {
            this.teamId = obj.teamId
            this.team = res.data
            this.ispublic = this.team.attend == 'public'
        }).catch(err => {
            this.$message({
                type:'error',
                message: err.message
            })
        })
    },
    methods:{
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
        handleEnterContest: function(contestId){
            this.currentContestId = contestId
            contestGate(contestId, this.currentContestPassword).then( res => {
                this.$router.push('/contest/detial/' + this.currentContestId)
            }).catch(err => {
                if(err.code && err.code == '400'){
                    if (err.message == 'need password'){
                        this.passwordDialogVisible = true;
                    }
                    else if (err.message == 'password error'){
                        this.$message({
                            type: "error",
                            message: "密码错误"
                        })
                    }
                    else if(err.message == 'not started'){
                        this.$message({
                            message: '比赛未开始',
                            type: 'error'
                        })
                    }
                }
            })
        },
    }
}
</script>
<style scoped>
.bodybox{
    margin-top: 20px;
}
.nextCard{
    margin-top: 20px;
}

.bodybox .statuFont{
    font-size: 14px;
    font-weight: bold;
}

.teamDetial .teammatebox{
    margin-top: 20px;
}

.teamDetial .teammatename{
    float: left;
    margin-left: 20px;
    clear: both;
    font-size: 18px;
}
.teamDetial .teammatetag{
    float: left;
    margin-left: 20px;
    cursor: pointer;
}

.teamDetial .teammatetag span{
    margin-left: 5px;
}
.statuEndFont{
    color: #F56C6C;
}
.statuRunningFont{
    color: #67C23A;
}
.statuWaitingFont{
    color: #333300;
}

.teamDetial .titleFont{
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
.el-col{
    border: 1px solid transparent;
}
</style>