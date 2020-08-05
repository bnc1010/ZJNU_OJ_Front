<template>
    <div class="app-container">
        <el-card>

        </el-card>
        <el-card class="bodybox">
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
                            <router-link :to="'./detial/' + scope.row.id">
                                {{scope.row.title}}
                            </router-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="模式" width="100">
                    <template slot-scope="scope">
                        <el-tag effect="dark" class="tagboard" :color="patternTagColor(scope.row.pattern)" size="mini">{{ scope.row.pattern }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="类型" width="100">
                    <template slot-scope="scope">
                        <el-tag effect="dark" class="tagboard" :color="privilegeTagColor(scope.row.privilege)" size="mini">{{ scope.row.privilege }}</el-tag>
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
import {getContests} from '@/api/contest'
import {calTime} from '@/utils'
export default {
    name: "Contest",
    data(){
        return{
            tableData: [],
            page:{
                index:1,
                size:20,
                total:0,
                query:''
            }
        }
    },
    methods:{
        handleSizeChange: function(val){
            this.page.size=val
            this.flushContestList()
        },
        handleCurrentChange: function(val){
            this.page.index=val
            this.flushContestList()
        },
        flushContestList: function(){
            getContests(this.page.index, this.page.size, this.page.query).then(res => {
                this.tableData=res.data.content
                this.page.total=res.data.pagetotal
            }).catch(err => {

            })
        },
        patternTagColor: function(pattern){
            if(pattern == 'ACM'){
                return '#CC9966'
            }
            else if(pattern == 'IOI'){
                return '#999933'
            }
            else{
                return '#666633'
            }
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
        }

    },
    computed:{
        
    },
    mounted(){
        this.flushContestList()
    }
}
</script>
<style scoped>
.bodybox{
    margin-top: 20px;
}

.bodybox .tagboard{
    border: none;
    cursor:default 
}

.bodybox .statuFont{
    font-size: 14px;
    font-weight: bold;
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

.contestBox .titleFont{
    font-size: 14px;
    font-weight: bold;
}
</style>