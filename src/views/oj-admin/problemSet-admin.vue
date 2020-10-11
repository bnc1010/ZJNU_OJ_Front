<template>
    <div class="app-container">
        <el-row :gutter="20">
        <el-col :span="20" :xs="24">
            <el-card>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-input v-model="page.query" placeholder="搜索题单" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
                    </el-input>
                </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                <el-button type="primary" plain @click="addDialogVisible = true">新建题单</el-button>
                </div></el-col>
            </el-row>
            </el-card>
            <el-card class="Box">
            <div class="pagebar">
                <center>
                <el-pagination
                    :current-page="page.index"
                    :page-sizes="[20, 50, 100]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
                </center>
            </div>
            <el-divider />
            <center>
                <el-table
                :data="tableData"
                :fit="true"
                style="width: 100%"
                >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="80"
                />
                <el-table-column label="题单名称" width="320">
                    <template slot-scope="scope">
                    <!-- <router-link :to="'/problem/detial/' + scope.row.id"> -->
                        {{ scope.row.title }}
                    <!-- </router-link> -->
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="320">
                    <template slot-scope="scope">
                    <div v-for="(tag,key) in scope.row.tags" :key="key" class="tagbox">
                        <el-tag size="mini">{{ tag.name }}&nbsp;</el-tag>&nbsp;
                    </div>
                    </template>
                </el-table-column>
                <el-table-column label="公开" width="100">
                    <template slot-scope="scope">
                    {{ scope.row.active ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column align="right">
                    <template slot-scope="scope">
                    <el-button type="warning" plain size="small" @click="handleUpdateEvent(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </center>
            <el-divider />
            <div class="pagebar">
                <center>
                <el-pagination
                    :current-page="page.index"
                    :page-sizes="[20, 50, 100]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
                </center>
            </div>
            </el-card>
        </el-col>
        </el-row>
        <el-dialog
        title="提示"
        :visible.sync="addDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>
            <el-form label-position="left" label-width="120px" :model="addProblemSet">
                    <el-form-item label="题单名">
                        <el-input v-model="addProblemSet.title" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公开">
                        <el-switch
                            v-model="addProblemSet.active"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label='题单描述' >
                        <mavonEditor
                        v-model="addProblemSet.description"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label="题目" class="problemForm">
                        <el-button type="primary" size="mini" @click="handleProblem(1, addProblemSet)">添加</el-button>
                        <el-button type="danger" size="mini" @click="handleProblem(-1, addProblemSet)">删除</el-button>
                        <div v-for="(problem, id) in addProblemSet.problems" :key="id">
                            <el-form :inline="true" class="problemRow">
                                <el-form-item label="题目id" :rules="{required: true, message: 'id不能为空', trigger: 'blur'}">
                                    <el-input v-model="problem.id" @change="getProblemName(problem.id, id, addProblemSet)" class="problemIdBox"></el-input>
                                </el-form-item>
                                <el-form-item label="题目名称">
                                    <el-input v-model="showProblem[id]" :disabled="true"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                    <el-form-item label="标签">
                        <div class="problemTags-div">
                            <el-tag class="disvisiable" size="mini" effect="dark" ></el-tag>
                            <div v-for="(tag,key) in addProblemSet.tags" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" effect="dark" closable :key="key" @close="handleAddProblemSetTagClose(tag)">{{tag}}&nbsp;</el-tag>&nbsp;
                            </div>
                        </div>
                        <div>
                            <div class="tagsbox">
                                <div class="box-center">
                                    <div v-for="(tag,key) in tags" :key="key" class="tagbox">
                                        <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark" @click="handleAddProblemSetAddTag(tag)">{{tag }}&nbsp;</el-tag>&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleAdd">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="editDialogVisible"
        width="50%"
        :before-close="handleClose">
        <span>
            <el-form label-position="left" label-width="120px" :model="editProblemSet">
                    <el-form-item label="题单名">
                        <el-input v-model="editProblemSet.title" style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="是否公开">
                        <el-switch
                            v-model="editProblemSet.active"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label='题单描述' >
                        <mavonEditor
                        v-model="editProblemSet.description"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label="题目" class="problemForm">
                        <el-button type="primary" size="mini" @click="handleProblem(1, editProblemSet)">添加</el-button>
                        <el-button type="danger" size="mini" @click="handleProblem(-1, editProblemSet)">删除</el-button>
                        <div v-for="(problem, id) in editProblemSet.problems" :key="id">
                            <el-form :inline="true" class="problemRow">
                                <el-form-item label="题目id" :rules="{required: true, message: 'id不能为空', trigger: 'blur'}">
                                    <el-input v-model="problem.id" @change="getProblemName(problem.id, id, editProblemSet)" class="problemIdBox"></el-input>
                                </el-form-item>
                                <el-form-item label="题目名称">
                                    <el-input v-model="showProblem[id]" :disabled="true"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-form-item>
                    <el-form-item label="标签">
                        <div class="problemTags-div">
                            <el-tag class="disvisiable" size="mini" effect="dark" ></el-tag>
                            <div v-for="(tag,key) in editProblemSet.tags" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" effect="dark" closable :key="key" @close="handleEditProblemSetTagClose(tag)">{{tag}}&nbsp;</el-tag>&nbsp;
                            </div>
                        </div>
                        <div>
                            <div class="tagsbox">
                                <div class="box-center">
                                    <div v-for="(tag,key) in tags" :key="key" class="tagbox">
                                        <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark" @click="handleEditProblemSetAddTag(tag)">{{tag }}&nbsp;</el-tag>&nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleUpdate">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import {mavonEditor} from 'mavon-editor'
import { getAllProblemSet, addProblemSet, updateProblemSet } from '@/api/problemSet'
import { getTags, getProblemName } from '@/api/problem'
export default {
    name: 'ProblemSetAdmin',
    components:{mavonEditor},
    data(){
        return {
            page: {
                index: 1,
                size: 20,
                total: 0,
                query: ''
            },
            tableData: [],
            tags: [],
            addDialogVisible: false,
            editDialogVisible: false,
            addProblemSet:{
                title: '',
                description: '',
                active: false,
                problems: [],
                tags: []
            },
            editProblemSet:{
                title: '',
                description: '',
                active: false,
                problems: [],
                tags: []
            },
            showProblem:[],
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
    mounted() {
        this.handleTags()
        this.flushList()
    },
    methods:{
        tagColor: function(key){
            let colors = ['#2185d0', '#21ba45', '#f2711c', '#e03997', '#a5673f']
            return colors[key%colors.length]
        },
        handleCurrentChange: function(val) {
            this.page.index = val
            this.flushList()
        },
        handleSizeChange: function(val) {
            this.page.size = val
            this.flushList()
        },
        handleSearch: function() {
            this.flushList()
        },
        handleAdd: function(problemSetId) {
            for(let ind in this.addProblemSet.problems){
                this.addProblemSet.problems[ind] = this.addProblemSet.problems[ind].id
            }
            console.log(this.addProblemSet)
            addProblemSet(this.addProblemSet).then( res => {
                this.$message({
                    type: 'success',
                    message: '新建成功'
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
            this.handleClose()
            this.flushList()
        },
        handleUpdateEvent: function(problemSet) {
            this.editProblemSet = problemSet
            for(let ind in this.editProblemSet.tags){
                this.editProblemSet.tags[ind] = this.editProblemSet.tags[ind].name
            }
            this.showProblem.length = 0
            for(let ind in this.editProblemSet.problems){
                this.showProblem.push(this.editProblemSet.problems[ind].title)
                this.editProblemSet.problems[ind] = {
                    id: this.editProblemSet.problems[ind].id
                }
            }
            this.editDialogVisible = true
        },
        handleUpdate: function(){
            for(let ind in this.editProblemSet.problems){
                this.editProblemSet.problems[ind] = this.editProblemSet.problems[ind].id
            }
            updateProblemSet(this.editProblemSet).then( res => {
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
            this.flushList()
            this.handleClose()
        },
        handleClose: function(){
            this.addDialogVisible = false
            this.editDialogVisible = false
            this.addProblemSet = {
                title: '',
                description: '',
                active: false,
                problems: [],
                tags: []
            }
            this.editProblemSet = {}
            this.showProblem = []
        },
        flushList: function() {
            getAllProblemSet(this.page.index, this.page.size, this.page.query).then( res => {
                this.page.total = res.data.totalElements
                this.tableData = res.data.content
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleProblem: function(type, goal){
            if (type === 1){
                goal.problems.push({
                    id:''
                })
                this.showProblem.push('')
            }
            else if(type === -1){
                goal.problems.pop()
                this.showProblem.pop()
            }
        },
        getProblemName: function(pid, ind, goal){
            console.log(pid,ind)
            getProblemName(pid).then( res => {
                if (res.data != null){
                    this.showProblem[ind] = res.data;
                    this.handleProblem(1, goal)
                    this.handleProblem(-1, goal)
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
        handleAddProblemSetTagClose :function(tag){
            this.addProblemSet.tags.splice(this.addProblemSet.tags.indexOf(tag), 1)
        },
        handleEditProblemSetTagClose :function(tag){
            this.editProblemSet.tags.splice(this.editProblemSet.tags.indexOf(tag), 1)
        },
        handleTags: function(){
            getTags().then(res => {
                this.tags = []
                for (const idx in res.data) {
                this.tags.push(res.data[idx].name)
                }
            }).catch(err => {
                console.log(err)
                this.$message({
                    type:'error',
                    message: '标签加载失败'
                })
            })
        },
        handleAddProblemSetAddTag: function(tag){
            if(this.addProblemSet.tags.indexOf(tag)===-1){
                this.addProblemSet.tags.push(tag)
            }
        },
        handleEditProblemSetAddTag: function(tag){
            if(this.editProblemSet.tags.indexOf(tag)===-1){
                this.editProblemSet.tags.push(tag)
            }
        },
    }
}
</script>
<style scoped>
.pagebar{
    margin: auto;
    width: 100%;
}
.el-col{
    border: 1px solid transparent;
}

.Box{
    margin-top: 20px;
}
.tagbox{
    float: left;
    margin: auto 2px;

}

.tagbox :hover{
    cursor:default 
}

.tagsbox{
    float: left;
    width: 100%;
    padding-left: 5px;
}

.tagsbox .tagbox{
    float: left;
    margin-bottom: 10px;
}

.tagsbox .tagbox :hover{
    cursor: pointer;
}

.tagsbox .tagbox .tagboard{
    border: none;
}
.problemTags-div{
    height: 100%;
    width: 100%;
    border-width: 2px;
}
.disvisiable {
    visibility: hidden;
}
</style>