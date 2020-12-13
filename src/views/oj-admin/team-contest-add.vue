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
                        <el-button type="primary" size="mini" @click="handleAddProblemSet()">添加题目集</el-button>
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
                        <el-button type="success" plain @click="cloneVisiable = true">克隆</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="4" :xs="24"></el-col>
      </el-row>
      <el-dialog :visible.sync="problemSetVisible" title="添加题目集">
          <span>
              <div>
                <el-checkbox-group v-model="checkedProblemSet" @change="handleCheckedProblemSetChange">
                    <el-checkbox v-for="(ps, ind) in problemSets" :label="ps" :key="ind">{{ps}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="transferBox">
                <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="搜索题目集"
                    v-model="selectedOfProblemSet"
                    :data="availableProblemSets"
                    :titles="['可用题目集', '已选题目集']"
                    style="text-align: left; display: inline-block">
                </el-transfer>
              </div>
               
          </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="problemSetVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleGetProblemsFromProblemSet()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
            title="克隆比赛"
            :visible.sync="cloneVisiable"
            width="30%">
            <span>
                <el-input v-model="cloneId" placeholder="请输入比赛id"></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cloneVisiable = false">取 消</el-button>
                <el-button type="primary" @click="handleCloneContest(cloneId)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
import { getProblemName } from '@/api/problem'
import { creatContest, getContestInfo, updateContest, cloneContest } from '@/api/contest'
import { param2Obj, deepClone } from '@/utils'
import { getAvaliableProblemSet } from '@/api/problemSet'
export default {
    name:"ContestAdd",
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
                tid: "-1",
                id: "-1"
            },
            privilegeOptions:[
                {
                    label:"team",
                    value:0
                }
            ],
            problemSetVisible: false,
            optionValue: 0,
            availableProblemSets: [],
            selectedOfProblemSet: [],
            problemSets: ['个人题目集', '公共题目集'],
            checkedProblemSet:[],
            allProblemSets: [],
            isCreate: true,
            cloneId: '',
            cloneVisiable: false,
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
            },
            filterMethod(query, item) {
                return item.label.indexOf(query) > -1;
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
        this.contest.tid = obj.teamId
        if(obj.contestId != null){
            this.contest.id = obj.contestId
            this.isCreate = false
            getContestInfo(obj.contestId).then(res => {
                this.contest = res.data
                for(let idx in this.contest.problems){
                    this.contest.problems[idx].id = this.contest.problems[idx].problem.id
                    this.contest.problems[idx].name = this.contest.problems[idx].problem.title
                    this.contest.startTime = this.contest.normalStartTime
                }
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        }
    },
    methods:{
        getProblemName: function(pid, ind){
            getProblemName(pid).then( res => {
                if (res.data != null){
                    this.contest.problems[ind].name = res.data;
                    this.contest.problems[ind].tempTitle = res.data;
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
                    message: err.message
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
            if(this.isCreate){
                this.contest.privilege = this.privilegeOptions[this.optionValue].label
                creatContest(this.contest).then( res => {
                    this.$message({
                        type: 'success',
                        message: '训练创建成功'
                    })
                    this.$router.go(-1)
                }).catch( err => {
                    this.$message({
                        type: 'error',
                        message: '训练创建失败'
                    })
                })
            }
            else{
                updateContest(this.contest, this.contest.id).then( res => {
                    this.$message({
                        type: 'success',
                        message: '训练更新成功'
                    })
                }).catch( res => {
                    this.$message({
                        type: 'error',
                        message: '训练更新失败'
                    })
                })
            }
        },
        handleAddProblemSet: function() {
            this.availableProblemSets = []
            this.selectedOfProblemSet = []
            this.checkedProblemSet = []
            this.problemSetVisible = true
        },
        handleCheckedProblemSetChange(value) {
            this.availableProblemSets = []
            this.selectedOfProblemSet = []
            let type = 0
            for(let ind in value){
                if(value[ind] == '个人题目集'){
                    type |= 1
                }
                else if(value[ind] == '公共题目集'){
                    type |= 2
                }
            }
            if(type == 0){
                return;
            }
            getAvaliableProblemSet(type).then( res => {
                let ps = res.data
                this.allProblemSets = deepClone(ps)
                this.availableProblemSets = []
                this.selectedOfProblemSet = []
                ps.forEach((_ps, ind) => {
                    this.availableProblemSets.push({
                        label: _ps.title,
                        key: ind,
                    })
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleGetProblemsFromProblemSet: function() {
            var map = new Map();
            for(let ind in this.contest.problems){
                map.set(this.contest.problems[ind].id, true)
            }
            for(let ind in this.selectedOfProblemSet){
                for(let _ind in this.allProblemSets[this.selectedOfProblemSet[ind]].problems){
                    if(map.get(this.allProblemSets[this.selectedOfProblemSet[ind]].problems[_ind].id) == null){
                        this.contest.problems.push({
                            id: this.allProblemSets[this.selectedOfProblemSet[ind]].problems[_ind].id,
                            name: "",
                            tempTitle: ""
                        })
                        this.getProblemName(this.allProblemSets[this.selectedOfProblemSet[ind]].problems[_ind].id, this.contest.problems.length - 1)
                        map.set(this.allProblemSets[this.selectedOfProblemSet[ind]].problems[_ind].id, true)
                    }
                }
            }
            this.problemSetVisible = false
        },
        handleCloneContest: function(cloneId) {
            if(cloneId == ''){
                this.$message({
                    type: 'error',
                    message: '请输入比赛id'
                })
                return;
            }
            cloneContest(cloneId).then( res => {
                this.contest.title = res.data.title
                this.contest.description = res.data.description
                this.contest.length = res.data.length
                this.contest.problems = []
                for(let ind in res.data.problems){
                    this.contest.problems.push({
                        id: res.data.problems[ind].problem.id,
                        name: res.data.problems[ind].problem.title,
                        tempTitle: res.data.problems[ind].tempTitle
                    })
                }
                this.$message({
                    type: 'success',
                    message: '克隆成功'
                })
                this.cloneVisiable = false
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        }
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
.transferBox{
    margin-top: 50px;
    width: 100%;
    text-align: center;
}
</style>