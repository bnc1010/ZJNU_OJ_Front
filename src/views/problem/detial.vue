<template>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="18" :xs="24">
            <el-card class="problemHeader">
                <el-row>
                    <h1>{{problem.title}}</h1>
                    <el-table
                        :data="problemData"
                        border
                        :cell-style="rowClass"
                        :header-cell-style="headClass"
                        style="width: 100%">
                        <el-table-column
                        prop="timeLimit"
                        label="Time Limit"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="memoryLimit"
                        label="Memory Limit"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="submitted"
                        label="Submitted">
                        </el-table-column>
                        <el-table-column
                        prop="accepted"
                        label="Accepted">
                        </el-table-column>
                        <el-table-column
                        prop="score"
                        label="积分">
                        </el-table-column>
                        <el-table-column
                        prop="source"
                        label="来源">
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-card>
            <el-card class="problemBody">
                <h2>题目描述</h2>
                <mavonEditor v-model="problem.description"
                :ishljs="true"
                :subfield="false"                                    
                :boxShadow="false"                                    
                defaultOpen="preview"                                    
                :toolbarsFlag="false" 
                ></mavonEditor>
                <el-divider></el-divider>
                <h2>输入</h2>
                <mavonEditor v-model="problem.input"
                :ishljs="true"
                :subfield="false"                                    
                :boxShadow="false"                                    
                defaultOpen="preview"                                    
                :toolbarsFlag="false"
                min-height="50px"
                ></mavonEditor>
                <el-divider></el-divider>
                <h2>输出</h2>
                <mavonEditor v-model="problem.output"
                :ishljs="true"
                :subfield="false"                                    
                :boxShadow="false"                                    
                defaultOpen="preview"                                    
                :toolbarsFlag="false" 
                ></mavonEditor>
                <el-divider></el-divider>
                <h2>样例输入</h2>
                <mavonEditor v-model="problem.sampleInput"
                :ishljs="true"
                :subfield="false"                                    
                :boxShadow="false"                                    
                defaultOpen="preview"                                    
                :toolbarsFlag="false" 
                ></mavonEditor>
                <el-divider></el-divider>
                <h2>样例输出</h2>
                <mavonEditor v-model="problem.sampleOutput"
                :ishljs="true"
                :subfield="false"                                    
                :boxShadow="false"                                    
                defaultOpen="preview"                                    
                :toolbarsFlag="false" 
                ></mavonEditor>
                <el-divider></el-divider>
                <h2>提示</h2>
                <mavonEditor v-model="problem.hint"
                :ishljs="true"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false" 
                ></mavonEditor>
            </el-card>
            <el-card class="codeEditor">
                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="选择语言:">
                        <el-select v-model="submitOption.selectedLang" size="small" class="langSelecter" @change="handleLangChanged">
                            <el-option
                                v-for="(item,key) in langOptions"
                                :key="key"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否公开">
                        <el-switch
                        v-model="submitOption.share"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <el-divider></el-divider>
                <codemirror v-model="submitOption.code" :options="cmOptions"></codemirror>
                <el-divider></el-divider>
                <el-button type="primary" @click="handleSubmitCode">提交</el-button>
            </el-card>
        </el-col>
        <el-col :span="6" :xs="24">
            <el-card style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                    <span>题目标签</span>
                </div>
                <div class="tagsbox">
                    <div class="box-center">
                        <div v-for="(tag,key) in problem.tags" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark">{{tag.name }}&nbsp;</el-tag>&nbsp;
                        </div>
                    </div>
                </div>
            </el-card>
             <el-card style="margin-bottom:20px;">
                <div slot="header" class="divCardHeader">
                    <div class="divCardHeaderTitle">
                        <div class="titleContent">
                            最近提交
                            <i class='el-icon-refresh-right'></i>
                        </div>
                    </div>
                    <div class="divMore">
                        <router-link :to="'#'">more</router-link>
                    </div>
                </div>
                <div class="submitShowBox">
                    <el-table
                        :data="submits"
                        border
                        :header-cell-style="headClass"
                        :row-class-name="tableRowClassName"
                        @row-click="handleSubmitRowClick"
                        style="width: 100%">
                        <el-table-column
                        prop="normalResult"
                        label="提交结果"
                        width="150">
                        </el-table-column>
                        <el-table-column
                        prop="normalSubmitTime"
                        label="提交时间">
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </el-col>
      </el-row>

      <el-dialog
        :visible.sync="submitDetialVisible"
        width="66%"
        :title="'#'+ submitDetial.id +' 用户名:' + submitDetial.user.username + ' 题目:' + submitDetial.problem.id">
        <el-card shadow="never" class="StatuShowBox">
            <el-table
                :data="submitDetialForm"
                border
                :header-cell-style="headClass"
                style="width: 100%">
                <el-table-column
                prop="normalResult"
                label="结果"
                width="120">
                </el-table-column>
                <el-table-column
                prop="time"
                label="用时(ms)"
                width="100">
                </el-table-column>
                <el-table-column
                prop="memory"
                label="内存"
                width="100">
                </el-table-column>
                <el-table-column
                prop="length"
                label="代码长度"
                width="100">
                </el-table-column>
                <el-table-column
                prop="normalLanguage"
                label="语言"
                width="100">
                </el-table-column>
                <el-table-column
                prop="share"
                label="公开"
                width="100">
                </el-table-column>
                <el-table-column
                prop="normalSubmitTime"
                label="提交时间">
                </el-table-column>
            </el-table>
        </el-card>
        <el-card>
            <mavonEditor v-model="submitDetial.source"
                :ishljs="true"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false" 
                :tabSize="2"
                ></mavonEditor>
        </el-card>
        <span slot="footer" class="dialog-footer">
            <el-button  @click="handleSetShareStatu" type="primary" plain>{{submitDetial.shareButton}}</el-button>
            <el-button  @click="submitDetialVisible = false" type="danger" plain>关 闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import {calSize, paramOfResultfulUrl} from '@/utils'
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {getStatusBySubmitId, setStatuShareBySubmitId, submitCode, getProblemById, getLastSubmits} from '@/api/problem'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/go/go.js'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/theme/ttcn.css'


export default {
    components:{mavonEditor, codemirror},
    data(){
        return{
            problem:{},
            problemData:[],
            submits:[],
            submitDetialVisible: false,
            submitDetial:{
                user:{
                    username:''
                },
                id:-1,
                problem:{
                    id:-1
                },
                source:'',
                shareButton:'设为公开'
            },
            submitDetialForm:[],
            cmOptions:{
                mode: 'text/x-csrc',
                smartIndent:true,
                matchBrackets: true,
                tabSize: 4,
                theme: 'ttcn',
                lineNumbers: true,
                line: true,
            },
            langOptions:[
                {
                    value:'text/x-csrc',
                    label: 'C'
                },
                {
                    value:'text/x-c++src',
                    label: 'C++'
                },
                {
                    value:'text/x-java',
                    label: 'Java'
                },
                {
                    value:'text/x-python',
                    label: 'Python2'
                },
                {
                    value:'text/x-python',
                    label: 'Python3'
                },
                {
                    value:'text/x-go',
                    label: 'Golang'
                },
            ],
            submitOption:{
                selectedLang:'C',
                share:true,
                code:'',
                problemId: -1
            }
        }
    },
    mounted(){
        getProblemById(paramOfResultfulUrl(window.location.href)).then(res => {
            this.problem=res.data
            this.problemData.push({
                timeLimit:this.problem.timeLimit + 'ms',
                memoryLimit:calSize(this.problem.memoryLimit),
                submitted:this.problem.submitted,
                accepted:this.problem.accepted,
                score: this.problem.score,
                source:this.problem.source
            })
            this.submitOption.problemId = this.problem.id;
        }).catch(err => {
            this.$message({
                message: '加载失败',
                type: 'error'
            })
        })
        getLastSubmits(paramOfResultfulUrl(window.location.href)).then(res => {
            this.submits=res.data
        }).catch(err => {
            this.$message({
                message: '最近提交加载失败',
                type: 'error'
            })
        })
        
    },
    methods:{
        headClass () {
            return 'text-align: center;background:#F2F6FC;'
        },
        // 表格样式设置
        rowClass () {
            return 'text-align: center;'
        },
        tagColor: function(key){
            let colors = ['#2185d0', '#21ba45', '#f2711c', '#e03997', '#a5673f']
            return colors[key%colors.length]
        },
        tableRowClassName({row, rowIndex}) {
            if (row.result=='Accepted') {
                return 'success-row'
            }
            else{
                return 'error-row'
            }
            return ''
        },
        handleSubmitRowClick: function(row){
            this.submitDetialVisible=true
            getStatusBySubmitId(row.id).then(res =>{
                this.submitDetial=res.data
                this.submitDetial.source='```' + this.submitDetial.normalLanguage + '\n' + this.submitDetial.source + '\n```\n'
                this.submitDetial.shareButton=this.submitDetial.share?'设为私密':'设为公开'
                this.submitDetialForm=[]
                this.submitDetialForm.push({
                    normalResult:this.submitDetial.normalResult,
                    time:this.submitDetial.time,
                    memory:calSize(this.submitDetial.memory),
                    length:this.submitDetial.length,
                    normalLanguage:this.submitDetial.normalLanguage,
                    normalSubmitTime: this.submitDetial.normalSubmitTime,
                    share: this.submitDetial.share?'公开':'私密'
                })
            }).catch(err =>{
                this.submitDetialVisible=false
            })
            
        },
        handleSetShareStatu: function(){
            setStatuShareBySubmitId(this.submitDetial.id).then(res =>{
                this.$message({
                    message: '设置成功',
                    type: 'success'
                });
                this.submitDetial.share=!this.submitDetial.share
                this.submitDetialForm=[]
                this.submitDetialForm.push({
                    normalResult:this.submitDetial.normalResult,
                    time:this.submitDetial.time,
                    memory:calSize(this.submitDetial.memory),
                    length:this.submitDetial.length,
                    normalLanguage:this.submitDetial.normalLanguage,
                    normalSubmitTime: this.submitDetial.normalSubmitTime,
                    share: this.submitDetial.share?'公开':'私密'
                })
            }).catch(err =>{

            })
        },
        handleLangChanged: function(value){
            this.cmOptions.mode=value;
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
        }
    }
}
</script>
<style>
.el-table .success-row {
    background: #f0f9eb;
}

.el-table .error-row {
    background: #FDE2E2;
}

.problemHeader{
    text-align: center;
}

.problemHeader .el-table tbody tr:hover>td { 
    background-color:#ffffff!important
}

.problemBody .v-note-wrapper{
    min-height: 50px;
}

.tagsbox{
    float: left;
}

.tagsbox .tagbox{
    float: left;
    margin: 6px 2px;
}

.tagsbox .tagbox :hover{
    cursor: default;
}

.submitShowBox td{
    font-size: 10px;
    text-align: center;
    font-weight: bold;
}

.submitShowBox td :hover{
    cursor: default;
}

.StatuShowBox td{
    font-size: 15px;
    text-align: center;
}

.submitShowBox td :hover{
    cursor: default;
}

.codeEditor{
    margin-top: 50px;
}

.langSelecter{
    height: 100%;
}

.divCardHeader{
    height: 20px;
}

.divCardHeader .divCardHeaderTitle{
    float: left;
    height: 100%;
    line-height: 100%;
}
.divCardHeader .divCardHeaderTitle .titleContent{
    margin-left: 0;
    margin-top: auto;
}
.divMore{
    float: right;
    font-size: 13px;
}
</style>