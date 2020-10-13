<template>
    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="搜索排名或用户名" v-model="page.query" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        <el-button @click="flushRanklist">刷新</el-button>
                    </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </el-card>
        <el-card class="bodybox ranklist">
            <el-table
                :data="tableData"
                width="100%">
                <div v-for="(x, index) in columns" :key="'col' + index">
                    <el-table-column :label="x.label" :width="x.width" :align="getCellAlign(getTypeOfColumn(x.prop))" >
                        <template slot-scope="scope">
                            <div v-if="getTypeOfColumn(x.prop) == 1">
                                <div v-if="getProp(scope.row, [x.prop, 'isAccept'])">
                                    <div :class="handleOkBoxClass(getProp(scope.row, [x.prop, 'isFirst']))">
                                        <span style="font-weight: bold; color: rgb(82, 196, 26);">
                                            <span v-if="getContentByTry(getProp(scope.row, [x.prop, 'try']), true)==1">
                                                <svg-icon icon-class="ac" style="height:1em"></svg-icon>
                                            </span>
                                            <span v-else>
                                                {{getContentByTry(getProp(scope.row, [x.prop, 'try']), true)}}
                                            </span>
                                        </span>
                                        <br/>
                                        <span class="time">
                                        {{'(' + getTime(getProp(scope.row, [x.prop, 'firstTime'])) + ')'}}
                                        </span>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="getContentByTry(getProp(scope.row, [x.prop, 'try']), false)==2">
                                        
                                    </div>
                                    <div v-else>
                                        <span style="font-weight: bold; color: rgb(231, 76, 60);">
                                            {{getContentByTry(getProp(scope.row, [x.prop, 'try']), false)}}
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>
                            <div v-else-if="getTypeOfColumn(x.prop) == 2">
                                <div class="ACStatusBox">
                                    <span style="font-weight: bold; color: #606266;">{{getProp(scope.row, [x.prop, 'acceptCount'])}}</span>
                                    <br/>
                                    <span class="time">
                                        {{'(' + getTime(getProp(scope.row, [x.prop, 'totalTime'])) + ')'}}
                                    </span>
                                </div>
                            </div>
                            <div v-else>
                                {{getProp(scope.row, [x.prop])}}
                            </div>
                        </template>
                    </el-table-column>
                </div>
            </el-table>
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
import {seconds2Clock, mapNum2Alpha, deepClone } from '@/utils'
import { getRanklist } from '@/api/contest'
export default {
    name:"ContestRankList",
    props:{
        cid:{
            type: String,
            default: '-1'
        }
    },
    data() {
      return {
        page:{
            index:1,
            size:20,
            total:0,
            query:''
        },
        tpcolumns:[
            {

            },
            {
                prop:'rank',
                label:'排名',
                width:80
            },
            {
                prop:'username',
                label:'用户名',
                width:200
            },
            {
                prop:'total',
                label:'成绩',
                width:100
            }
        ],
        columns: [],
        tableData: [],
      }
    },
    mounted(){
        this.flushRanklist()
    },
    methods:{
        handleCurrentChange: function(val){
            // this.page.index=val
            console.log(val)
        },
        handleSizeChange: function(val){
            // this.page.size=val
            console.log(val)
        },
        getTypeOfColumn: function(prop){
            if(!prop){
                return -1
            }
            if(prop && prop.length == 1 && /[A-Z]{1}/.test(prop)){//是题目的cell
                return 1
            }
            else if(prop == 'total'){
                return 2
            }
            else {
                return 3
            }

        },
        getProp: function(object, props){
            let pp = ''
            for(let x in props){
                pp += '.' + props[x]
            }
            return eval('object' + pp)
        },
        getTime:function(second){
            return seconds2Clock(second)
        },
        handleOkBoxClass: function(isFirst){
            if(isFirst){
                return 'ACStatusBox firstAC'
            }
            else{
                return 'ACStatusBox'
            }
        },
        getContentByTry: function(tryTimes, isAccept){
            if(isAccept){
                if(tryTimes && tryTimes==1){
                    return 1
                }
                else{
                    return '+' + (tryTimes-1)
                }
            }
            else{
                if(tryTimes==0){
                    return 2
                }
                else{
                    return '-' + tryTimes
                }
            }
        },
        getCellAlign: function(type){
                if(type == 3){
                    return 'left'
                }
                else{
                    return 'center'
                }
        },


        // {
        //   username: '张三',
        //   rank:2,
        //   total: {
        //       acceptCount:1,
        //       totalTime:7260
        //   },
        //   A:{
        //       isAccept:true,
        //       try:3,
        //       firstTime:60,
        //       isFirst:true
        //   }
        // }
        flushRanklist: function() {
            getRanklist(this.cid, this.page.index, this.page.size).then( res => {
                this.page.total = res.data.rows.totalElements
                this.columns = deepClone(this.tpcolumns)
                for(let x = 0; x <res.data.problemsNumber; x++){
                    this.columns.push({
                        prop: mapNum2Alpha(x, true),
                        label: mapNum2Alpha(x, true),
                        width:100
                    })
                }
                this.tableData.length = 0
                for(let x in res.data.rows.content){
                    let rowTemp = {}
                    rowTemp['username'] = res.data.rows.content[x].user.username
                    rowTemp['rank'] = res.data.rows.content[x].order
                    rowTemp['total'] = {
                        acceptCount: res.data.rows.content[x].solved,
                        totalTime: res.data.rows.content[x].penalty
                    }
                    for(let y=0; y < res.data.rows.content[x].boxes.length; y++){                 
                        rowTemp[mapNum2Alpha(y, true)] = {
                            isAccept: res.data.rows.content[x].boxes[y].accepted,
                            try: res.data.rows.content[x].boxes[y].submit,
                            firstTime: res.data.rows.content[x].boxes[y].time,
                            isFirst: res.data.rows.content[x].boxes[y].first
                        }
                    }
                    this.tableData.push(rowTemp)
                }
            }).catch( err => {
                
            })
        }
    },
    computed:{
        getTableWidth: function() {
            let width = 0
            for(let id in this.columns){
                width += this.columns[id].width
            }
            return width
        }
    }
}
</script>
<style>
.bodybox{
  margin-top: 20px;
}

.ranklist .el-table td, .el-table th{
    padding:0 !important
}

.ranklist .el-table .cell{
    padding:0 1px !important
}

.firstAC{
    background-color: rgb(217, 240, 199);
}

.ACStatusBox{
    padding: 0.5em 0;
    text-align: center;
    min-width: 4.8em;
    line-height: 1em;
    height: 3em;
}

.ACStatusBox .time{
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
}
.el-col{
    border: 1px solid transparent; 
}

</style>