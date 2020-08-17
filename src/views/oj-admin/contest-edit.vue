<template>
    <div class="app-container contestEdit">
        <el-row :gutter="20">
        <el-col :span="20" :xs="24">
            <el-card>
                <el-form label-position="left" label-width="120px" :model="contest">
                    <el-form-item label="比赛名">
                        <el-input v-model="contest.title" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label='比赛描述' >
                        <mavonEditor
                        v-model="contest.description"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="optionValue" placeholder="请选择">
                            <el-option
                            v-for="item in privilegeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="contest.password" :disabled="isPasswordNeeded" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker
                            v-model="contest.startTime"
                            type="datetime"
                            placeholder="选择时间"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="时长(分钟)">
                        <el-input v-model="contest.length" style="width:250px"></el-input>
                    </el-form-item>
                    <el-form-item label="题目" class="problemForm">
                        <el-button type="primary" size="mini" @click="handleProblem(1)">添加</el-button>
                        <el-button type="danger" size="mini" @click="handleProblem(-1)">删除</el-button>
                        <div v-for="(problem, id) in contest.problems" :key="id">
                            <el-form :inline="true" class="problemRow">
                                <el-form-item label="题目id" :rules="{required: true, message: 'id不能为空', trigger: 'blur'}">
                                    <el-input v-model="problem.id" @change="getProblemName(problem.id, id)" class="problemIdBox"></el-input>
                                </el-form-item>
                                <el-form-item label="题目名称">
                                    <el-input v-model="problem.name" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item label="显示名称">
                                    <el-input v-model="problem.tempTitle"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="handleSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="4" :xs="24"></el-col>
      </el-row>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'
import {getProblemName} from '@/api/problem'
import {updateContest, getContestInfo} from '@/api/contest'
import {paramOfResultfulUrl} from '@/utils'
export default {
    name:"ContestEdit",
    components:{mavonEditor},
    data(){
        return {
            tags:[],
            contest:{
                description:"", 
                title: "",
                privilege: "",
                problems: [],
                startTime: "",
                length: 300,
                password: "",
                tid: "0"
            },
            privilegeOptions:[
                {
                    label:"public",
                    value:0
                },
                {
                    label:"private",
                    value:1
                }
            ],
            optionValue: 0,
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    computed:{
        isPasswordNeeded: function(){
            console.log(this.optionValue)
            return this.optionValue == 0
        }
    },
    methods:{
        getProblemName: function(pid, ind, same=true){
            getProblemName(pid).then( res => {
                if (res.data != null){
                    this.contest.problems[ind].name = res.data;
                    if(same){
                        this.contest.problems[ind].tempTitle = res.data;
                    }
                    this.handleProblem(1)
                    this.handleProblem(-1)
                }
                else{
                    this.$message({
                    type: "error",
                    message: "该id对应题目不存在"
                })
                }
            }).catch(err => {
                this.$message({
                    type: "error",
                    message: err
                })
            })
        },
        handleProblem: function(type){
            if (type === 1){
                this.contest.problems.push(
                    {
                        id: "",
                        name: "",
                        tempTitle: ""
                    }
                )
            }
            else if(type === -1){
                this.contest.problems.pop()
            }
        },
        handleSubmit: function(){
            this.contest.privilege = this.privilegeOptions[this.optionValue].label
            updateContest(this.contest, this.contest.id).then( res => {
                this.$message({
                    type: 'success',
                    message: '比赛创建成功'
                })
                this.$router.push('/ojAdmin/contest')
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: '比赛创建失败'
                })
            })
        }
    },
    mounted(){
        getContestInfo(paramOfResultfulUrl(window.location.href)).then(res => {
            this.contest = res.data
            for(let idx in this.contest.problems){
                this.contest.problems[idx].id = this.contest.problems[idx].problem.id
                this.contest.problems[idx].name = this.contest.problems[idx].problem.title
                this.contest.startTime = this.contest.normalStartTime
            }
            if(res.data.privilege == 'public'){
                this.optionValue=0
            }
            else{
                this.optionValue=1
            }
        }).catch(err => {
            this.$message({
                type: 'error',
                message: err
            })
        })
    }
}
</script>
<style scoped>

.problemForm .problemRow{
    margin-top: 20px
}
.problemForm .problemIdBox{
    width: 100px
}
</style>