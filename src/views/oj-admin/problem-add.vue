<template>
    <div class="app-container problemEdit">
        <el-row :gutter="20">
        <el-col :span="20" :xs="24">
            <el-card>
                <el-form label-position="left" label-width="120px" :model="problem">
                    <el-form-item label="题目名">
                        <el-input v-model="problem.title"></el-input>
                    </el-form-item>
                    <el-form-item label="在题库公开">
                        <el-switch v-model="problem.active"></el-switch>
                    </el-form-item>
                    <el-form-item label="Time Limit">
                        <el-input v-model="problem.time">
                            <template slot="append">ms</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Memory Limit">
                        <el-input v-model="problem._memory" class="input-with-select">
                            <el-select v-model="setting.memoryType" slot="append" placeholder="请选择">
                            <el-option label="B" value="1"></el-option>
                            <el-option label="KB" value="2"></el-option>
                            <el-option label="MB" value="3"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="标签(点击右侧)">
                        <div class="problemTags-div">
                            <div v-for="(tag,key) in problem.tags" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" effect="dark" closable :key="key" @close="handleTagClose(tag)">{{tag}}&nbsp;</el-tag>&nbsp;
                        </div>
                        </div>
                    </el-form-item>
                    <el-form-item label='积分'>
                        <el-input v-model="problem.score"></el-input>
                    </el-form-item>
                    <el-form-item label='题目描述' >
                        <mavonEditor
                        v-model="problem.description"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label='输入' >
                        <mavonEditor
                        v-model="problem.input"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label='输出' >
                        <mavonEditor
                        v-model="problem.output"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label='样例输入' >
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="problem.sampleInput">
                        </el-input>
                    </el-form-item>
                    <el-form-item label='样例输出' >
                        <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 10}"
                        placeholder="请输入内容"
                        v-model="problem.sampleOutput">
                        </el-input>
                    </el-form-item>
                    <el-form-item label='提示' >
                        <mavonEditor
                        v-model="problem.hint"
                        :ishljs="true"
                        :subfield="true"
                        :boxShadow="false"
                        :toolbars="toolbars"
                        :autofocus="false">
                        </mavonEditor>
                    </el-form-item>
                    <el-form-item label="来源">
                        <el-input v-model="problem.source"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="handleSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="4" :xs="24">
            <el-card style="margin-bottom:20px;padding:10px;">
                <div slot="header" class="clearfix">
                <span>题目标签</span>
                </div>
                <div class="tagsbox">
                    <div class="box-center">
                        <div v-for="(tag,key) in tags" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark" @click="handleProblemAddTag(tag)">{{tag }}&nbsp;</el-tag>&nbsp;
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import {getProblems, getTags} from '@/api/problem'
import {mavonEditor} from 'mavon-editor'
export default {
    name:"ProblemAdd",
    components:{mavonEditor},
    data(){
        return {
            tags:[],
            problem:{
                active: true,
                description:"", 
                hint: "",
                input: "",
                _memory: 0,
                memory: 0,
                output: "",
                sampleInput: "",
                sampleOutput: "",
                score: 0,
                source: "",
                // tags: "初级,数论",
                tags:[],
                time: 0,
                title: "",
            },
            setting:{
                memoryType:'1'
            },
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
    methods:{
        tagColor: function(key){
            let colors = ['#2185d0', '#21ba45', '#f2711c', '#e03997', '#a5673f']
            return colors[key%colors.length]
        },
        handleTags: function(){
            getTags().then(res => {
                this.tags = res.data
            }).catch(err => {

            })
        },
        handleProblemAddTag: function(tag){
            if(this.problem.tags.indexOf(tag)===-1){
                this.problem.tags.push(tag)
            }
            console.log(this.problem.tags)
        },
        handleTagClose :function(tag){
            this.problem.tags.splice(this.problem.tags.indexOf(tag), 1)
        },
        changeMemory: function(){
            if(this.setting.memoryType=='1'){
                this.problem.memory = this.problem._memory
            }
            else if (this.setting.memoryType=='2'){
                this.problem.memory = this.problem._memory * 1024
            }
            else if(this.setting.memoryType=='3'){
                this.problem.memory = this.problem._memory * 1024 * 1024
            }
        },
        handleSubmit:function(){
            this.changeMemory()
            console.log(this.problem)
            //to do : 适配api
        }
    },
    mounted(){
        this.handleTags()
    }
}
</script>
<style>
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

.problemEdit .el-select .el-input {
width: 80px;
}
.problemEdit .input-with-select .el-input-group__prepend {
background-color: #fff;
}

.problemEdit .v-note-wrapper{
    height: 400px;
    z-index: auto;
}
</style>