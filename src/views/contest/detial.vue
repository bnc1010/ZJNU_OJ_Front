<template>
    <div class="app-container">
    <el-tabs tab-position="top" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="比赛说明" name="description">
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
        <el-tab-pane label="题目" name="problems">
            <el-row :gutter="20">
                <el-col :span="18" :xs="24">
                    <el-card class="problemHeader">
                        <el-row>
                            <h1>{{contest.problems[getIntChoosedProblemId()].tempTitle}}</h1>
                            <el-divider></el-divider>
                            <el-row :gutter="20">
                                <el-col :span="12">{{'时间限制: ' + contest.problems[getIntChoosedProblemId()].problem.timeLimit + "ms"}}</el-col>
                                <el-col :span="12">{{'空间限制: ' + getMemery(contest.problems[getIntChoosedProblemId()].problem.memoryLimit)}}</el-col>
                            </el-row>
                        </el-row>
                    </el-card>
                    <ProblemBody ref="problemBody" :problem="contest.problems[getIntChoosedProblemId()].problem"></ProblemBody>
                    <el-card class="codeEditor">
                        <el-form :inline="true"  class="demo-form-inline">
                            <el-form-item label="选择语言:">
                                <el-select v-model="submitOption.selectedLang" size="small" class="langSelecter" @change="handleLangChanged">
                                    <el-option
                                        v-for="(item,key) in langOptions"
                                        :key="key"
                                        :label="item.label"
                                        :value="item.id">
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
                            style="width: 100%"
                            :row-class-name="choosedProblemClass"
                            @row-click="handleChangeProblem"
                            >
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
                            <div slot="header" class="clearfix">
                                <span>统计&nbsp;<i class='el-icon-refresh-right'></i></span>
                            </div>
                            <acRate class="infoCard" :chartData="chartData"/>
                        </el-card>
                        <!-- <el-card class="infoCard">
                            这里放其它信息
                        </el-card> -->
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="排行榜" name="ranklist">
            <contestRanklist :cid="cid"/>
        </el-tab-pane>
        <el-tab-pane label="A&Q" name="aq">

        </el-tab-pane>
    </el-tabs>
    
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import ProblemBody from '../problem/components/ProblemBody'
import 'mavon-editor/dist/css/index.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/go/go.js'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/theme/ttcn.css'
import config from '@/utils/config'
import { calSize, mapAlpha2Num, mapNum2Alpha, paramOfResultfulUrl } from '@/utils'
import { getDetialContest, contestGate, submitProblem, getRanklist } from '@/api/contest'
import acRate from './components/acRate'
import contestRanklist from './components/contestRanklist'
import { mapGetters } from 'vuex'
import { sn_contest, sn_language } from '@/utils/sessionStorgeName'
export default {
    name:'ContestDetial',
    components:{ProblemBody,mavonEditor,codemirror,acRate,contestRanklist},
    data(){
        return{
            cmOptions:config.CMOptions,
            langOptions:config.LangOptions,
            submitOption:{
                selectedLang:0,
                share:false,
                code:'',
                problemId: -1
            },
            contest:{
                problems:[{problem:{timeLimit:'',timeLimit:'',memoryLimit:''}}]
            },
            tableData: [],
            choosedProblemId:'A',
            chartData: [
                {
                    name:'ac',
                    value:0
                },
                {
                    name:'wa',
                    value:0
                }
            ],
            langOptions: config.LangOptions,
            cid: -1,
            activeName: 'description'
        }
    },
    computed: {
        ...mapGetters([
            'currentContestPassword'
        ])
    },
    created(){
        this.cid = paramOfResultfulUrl(window.location.href)
        this.handleDetialOfContest()
    },
    mounted(){
        let _activeName = sessionStorage.getItem(sn_contest + this.cid)
        if(_activeName && _activeName.length > 0){
            this.activeName = _activeName
        }
        let _submitLang = sessionStorage.getItem(sn_language)
        if(_submitLang && _submitLang.length > 0){
            this.cmOptions.mode = this.langOptions[_submitLang].value;
            this.submitOption.selectedLang = _submitLang
        }
        else {
          this.submitOption.selectedLang = '0'
        }
    },
    methods:{
        handleLangChanged: function(value){
            this.cmOptions.mode=this.langOptions[value].value;
            sessionStorage.setItem(sn_language, value)
        },
        handleSubmitCode: function(){
            submitProblem(this.cid, this.submitOption.problemId, this.langOptions[this.submitOption.selectedLang].key, this.submitOption.code).then(res =>{
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }).catch(err =>{
                if (err.message == 'Need attendance!'){
                    this.$message({
                        type: "error",
                        message: "未参加该比赛"
                    })
                }
                if (err.message == 'The contest is not Running!'){
                    this.$message({
                        type: "error",
                        message: "比赛未在进行中"
                    })
                }
                if (err.message == 'Problem Not Exist'){
                    this.$message({
                        type: "error",
                        message: "题目不存在"
                    })
                }
            })
        },
        getMemery: function(sz){
            return calSize(sz)
        },
        choosedProblemClass({row, rowIndex}) {
            if (row.id === this.choosedProblemId) {
                return 'choosed-row';
            } else{
                return 'nochoosed-row';
            }
        },
        handleChangeProblem(row, col, e){
            if (row.id !== this.choosedProblemId) {
                this.choosedProblemId=row.id
                this.setEchart()
            }
        },
        getIntChoosedProblemId: function(){
            return mapAlpha2Num(this.choosedProblemId)
        },
        setEchart: function(){
            this.chartData=[]
            this.chartData.push({
                name:'ac',
                value:this.contest.problems[this.getIntChoosedProblemId()].accepted
            })
            this.chartData.push({
                name:'wa',
                value:this.contest.problems[this.getIntChoosedProblemId()].submitted-this.contest.problems[this.getIntChoosedProblemId()].accepted
            })
        },
        handleDetialOfContest: function(){
            contestGate(this.cid, this.currentContestPassword).then( res => {
                if(res.code=='200'){
                    getDetialContest(this.cid, this.currentContestPassword).then( res => {
                        this.contest = res.data
                        var problems = this.contest.problems
                        for(let x in problems){
                            this.tableData.push({
                                id:mapNum2Alpha(problems[x].tempId,1,-1),
                                title:problems[x].tempTitle
                            })
                        }
                        if (problems.length > 0){
                            this.submitOption.problemId = problems[0].tempId
                        }
                        this.setEchart()
                    }).catch( err => {
                        this.$message({
                            message: err.message,
                            type: 'error'
                        })
                    })
                }
                
            }).catch( err => {
                this.$message({
                    message: err.message,
                    type: 'error'
                })
            })
        },
        updatePage: function(value) {
            sessionStorage.setItem(sn_contest + this.cid, value)
        },
        handleClick(tab, event) {
            this.updatePage(tab.name)
        }
    }
}
</script>
<style>
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
.el-table .choosed-row{
    background:burlywood;
    cursor: pointer;
}
.el-table .nochoosed-row{
    cursor: pointer;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>