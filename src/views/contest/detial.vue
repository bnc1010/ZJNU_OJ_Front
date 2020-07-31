<template>
    <div class="app-container">
    <el-tabs tab-position="top">
        <el-tab-pane label="比赛说明">
            <el-card>
                <mavonEditor v-model="contest.description"
                :ishljs="true"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false" 
                :tabSize="2"
                ></mavonEditor>
            </el-card>
        </el-tab-pane>
        <el-tab-pane label="题目">
            <el-row :gutter="20">
                <el-col :span="18" :xs="24">
                    <el-card class="problemHeader">
                        <el-row>
                            <h1>{{contest.problems[0].tempTitle}}</h1>
                            <el-divider></el-divider>
                            <el-row :gutter="20">
                                <el-col :span="12">{{'时间限制: ' + contest.problems[0].problem.timeLimit}}</el-col>
                                <el-col :span="12">{{'空间限制: ' + getMemery(contest.problems[0].problem.memoryLimit)}}</el-col>
                            </el-row>
                        </el-row>
                    </el-card>
                    <ProblemBody :problem="contest.problems[0].problem"></ProblemBody>
                    <el-card class="codeEditor">
                        <el-form :inline="true"  class="demo-form-inline">
                            <el-form-item label="选择语言:">
                                <el-select v-model="submitOption.selectedLang" size="small" class="langSelecter" @change="handleLangChanged">
                                    <el-option
                                        v-for="(item,key) in langOptions"
                                        :key="key"
                                        :label="item.label"
                                        :value="key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-divider></el-divider>
                        <codemirror v-model="submitOption.code" :options="cmOptions"></codemirror>
                        <el-divider></el-divider>
                        <el-button type="primary" @click="handleSubmitCode">提交</el-button>
                    </el-card>
                </el-col>
                <el-col :span="6" :xs="24">
                    <el-card>
                        <el-table
                            :data="tableData"
                            style="width: 100%">
                            <el-table-column
                            prop="id"
                            label="题号"
                            width="50">
                            </el-table-column>
                            <el-table-column
                            prop="title"
                            label="题目名称">
                            </el-table-column>
                        </el-table>
                    </el-card>
                        <el-card class="infoCard">
                            这里放一个饼图
                        </el-card>
                        <el-card class="infoCard">
                            这里放其它信息
                        </el-card>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="排行榜">

        </el-tab-pane>
        <el-tab-pane label="A&Q">

        </el-tab-pane>
    </el-tabs>
    
    </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import {paramOfResultfulUrl} from '@/utils'
import ProblemBody from '../problem/components/ProblemBody'
import 'mavon-editor/dist/css/index.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/go/go.js'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/theme/ttcn.css'
import {cmOptions, langOptions} from '@/utils/config'
import config from '@/utils/config'
import {calSize} from '@/utils'
export default {
    name:'ContestDetial',
    components:{ProblemBody,mavonEditor,codemirror},
    data(){
        return{
            cmOptions:config.CMOptions,
            langOptions:config.LangOptions,
            submitOption:{
                selectedLang:'C',
                share:false,
                code:'',
                problemId: -1
            },
            contest:{
                description: "## 这是比赛说明\n```c++\n#include<bits/stdc++.h>\n```\n",
                endTime: "2020-03-06T11:45:00Z",
                ended: true,
                id: 3,
                length: "300",
                normalEndTime: "2020-03-06 19:45",
                normalStartTime: "2020-03-06 14:45",
                pattern: "acm",
                privilege: "public",
                problems: [
                    {
                        id: 9, 
                        problem: {
                            active: true,
                            description: "甜甜从小就喜欢画图画，最近他买了一支智能画笔，由于刚刚接触，所以甜甜只会用它来画直线，于是他就在平面直角坐标系中画出如下的图形：\n![](http://118.25.96.118:8081/api/media/d3015e28cc1b105b3c78a385c8702144)\n甜甜的好朋友蜜蜜发现上面的图还是有点规则的，于是他问甜甜：在你画的图中，我给你两个点，请你算一算连接两点的折线长度（即沿折线走的路线长度）吧。",
                            hint: "",
                            input: "第一个数是正整数 $N(\le100)$ 。代表数据的组数。\n每组数据由四个非负整数组成 $x1,y1,x2,y2$；所有的数都不会大于100。",
                            memoryLimit: 32768000,
                            output: "对于每组数据，输出两点(x1,y1),(x2,y2)之间的折线距离。注意输出结果精确到小数点后3位。",
                            sampleInput: "5\n0 0 0 1\n0 0 1 0\n2 3 3 1\n99 99 9 9\n5 5 5 5",
                            sampleOutput: "1.000\n2.414\n10.646\n54985.047\n0.000",
                            source: "",
                            timeLimit: 1000,
                            title: ""
                        }, 
                        tempId: 1, 
                        tempTitle: "A simple problemold", 
                        submitted: 5, 
                        accepted: 4
                    }
                ],
                runStatu: "已结束",
                startTime: "2020-03-06T06:45:00Z",
                started: true,
                title: "学分制班考试"
            },
            tableData: [{
                id:'A',
                title:'寻神者的道路'
                }, {
                id:'B',
                title:'寻神者的道路'
                }, {
                id:'C',
                title:'寻神者的道路'
            }]
        }
    },
    methods:{
        handleLangChanged: function(value){
            this.cmOptions.mode=this.langOptions[value].value;
        },
        handleSubmitCode: function(){
            submitCode(this.submitOption.problemId, this.submitOption.selectedLang, this.submitOption.share, this.submitOption.code).then(res =>{
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }).catch(err =>{
                this.$message({
                    message: '提交失败',
                    type: 'error'
                });
            })
        },
        getMemery: function(sz){
            return calSize(sz)
        }
    },
    mounted(){
        
    }
}
</script>
<style scoped>
.problemHeader{
    text-align: center;
}
.app-container .v-note-wrapper{
    min-height: 50px;
    z-index: auto;
}
.infoCard{
    margin-top: 20px;
}
</style>