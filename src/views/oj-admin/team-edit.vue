<template>
    <div class="app-container teamedit">
        <el-card>
            {{ team.name }}
        </el-card>
        <el-row :gutter="20" class="bodybox">
            <el-col :span="18" :xs="24">
                <el-card>

                </el-card>
            </el-col>
            <el-col :span="6" :xs="24">
                <!-- 显示成员 -->
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>成员</span>
                    </div>
                    <div v-for="(item, key) in team.teammates" :key="key">
                        <div> 
                            <div class="teammatename">
                                {{ item.user.username }} 
                            </div>
                            <div v-if="item.level == 0" class="teammatetag">
                                <el-tag effect="plain" size="mini" type="warning">master</el-tag>
                            </div>
                            <div v-else class="teammatetag">
                                <el-button size="mini" @click="handleMoveOut(item.user.id)" type="danger" plain>移出队伍</el-button>
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
import { param2Obj } from '@/utils'
import { getTeamById } from '@/api/team'
export default {
    name: 'TeamEdit',
    data(){
        return {
            teamId: -1,
            team: {}
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
        }).catch(err => {
            this.$message({
                type:'error',
                message: err.message
            })
        })
    },
    methods: {
        handleMoveOut: function(userId){

        }
    }
}
</script>
<style scoped>
.bodybox{
    margin-top: 20px;
}

.teamedit .teammatename{
    float: left;
    margin-left: 20px;
}
.teamedit .teammatetag{
    float: left;
    margin-left: 20px;
}
</style>

