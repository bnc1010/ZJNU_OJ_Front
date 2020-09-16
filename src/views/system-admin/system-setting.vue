<template>
    <div class="app-container systemsetting">
        <el-card>
            <el-form label-position="top" label-width="120px">
                <el-form-item label="公告">
                    <mavonEditor
                    ref=md1
                    v-model="configs.notice"
                    :ishljs="true"
                    :subfield="true"
                    :boxShadow="false"
                    :toolbars="toolbars"
                    @imgAdd="$imgAdd1"
                    :autofocus="false">
                    </mavonEditor>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="C:">
                    <div class="childForm">
                        <el-form label-position="top" label-width="100px">
                            <el-form-item label="src">
                                <el-input v-model="configs.c.src"></el-input>
                            </el-form-item>
                            <el-form-item label="seccomp_rule">
                                <el-input v-model="configs.c.seccomp_rule"></el-input>
                            </el-form-item>
                            <el-form-item label="run_command">
                                <el-input v-model="configs.c.run_command"></el-input>
                            </el-form-item>
                            <el-form-item label="compile_command">
                                <el-input v-model="configs.c.compile_command"></el-input>
                            </el-form-item>
                            <el-form-item label="memory_limit_check_only">
                                <el-input v-model="configs.c.memory_limit_check_only"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
                <el-form-item label="C++">
                    <div class="childForm">
                        <el-form label-position="top" label-width="100px">
                            <el-form-item label="src">
                                <el-input v-model="configs.cpp.src"></el-input>
                            </el-form-item>
                            <el-form-item label="seccomp_rule">
                                <el-input v-model="configs.cpp.seccomp_rule"></el-input>
                            </el-form-item>
                            <el-form-item label="run_command">
                                <el-input v-model="configs.cpp.run_command"></el-input>
                            </el-form-item>
                            <el-form-item label="compile_command">
                                <el-input v-model="configs.cpp.compile_command"></el-input>
                            </el-form-item>
                            <el-form-item label="memory_limit_check_only">
                                <el-input v-model="configs.cpp.memory_limit_check_only"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
                <el-form-item label="JAVA">
                    <div class="childForm">
                        <el-form label-position="top" label-width="100px">
                            <el-form-item label="src">
                                <el-input v-model="configs.java.src"></el-input>
                            </el-form-item>
                            <el-form-item label="seccomp_rule">
                                <el-input v-model="configs.java.seccomp_rule"></el-input>
                            </el-form-item>
                            <el-form-item label="run_command">
                                <el-input v-model="configs.java.run_command"></el-input>
                            </el-form-item>
                            <el-form-item label="compile_command">
                                <el-input v-model="configs.java.compile_command"></el-input>
                            </el-form-item>
                            <el-form-item label="memory_limit_check_only">
                                <el-input v-model="configs.java.memory_limit_check_only"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
                <el-form-item label="Python2">
                    <div class="childForm">
                        <el-form label-position="top" label-width="100px">
                            <el-form-item label="src">
                                <el-input v-model="configs.python2.src"></el-input>
                            </el-form-item>
                            <el-form-item label="seccomp_rule">
                                <el-input v-model="configs.python2.seccomp_rule"></el-input>
                            </el-form-item>
                            <el-form-item label="run_command">
                                <el-input v-model="configs.python2.run_command"></el-input>
                            </el-form-item>
                            <el-form-item label="compile_command">
                                <el-input v-model="configs.python2.compile_command"></el-input>
                            </el-form-item>
                            <el-form-item label="memory_limit_check_only">
                                <el-input v-model="configs.python2.memory_limit_check_only"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
                <el-form-item label="Python3">
                    <div class="childForm">
                        <el-form label-position="top" label-width="100px">
                            <el-form-item label="src">
                                <el-input v-model="configs.python3.src"></el-input>
                            </el-form-item>
                            <el-form-item label="seccomp_rule">
                                <el-input v-model="configs.python3.seccomp_rule"></el-input>
                            </el-form-item>
                            <el-form-item label="run_command">
                                <el-input v-model="configs.python3.run_command"></el-input>
                            </el-form-item>
                            <el-form-item label="compile_command">
                                <el-input v-model="configs.python3.compile_command"></el-input>
                            </el-form-item>
                            <el-form-item label="memory_limit_check_only">
                                <el-input v-model="configs.python3.memory_limit_check_only"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
                <el-form-item label="Golang">
                    <div class="childForm">
                        <el-form label-position="top" label-width="100px">
                            <el-form-item label="src">
                                <el-input v-model="configs.go.src"></el-input>
                            </el-form-item>
                            <el-form-item label="seccomp_rule">
                                <el-input v-model="configs.go.seccomp_rule"></el-input>
                            </el-form-item>
                            <el-form-item label="run_command">
                                <el-input v-model="configs.go.run_command"></el-input>
                            </el-form-item>
                            <el-form-item label="compile_command">
                                <el-input v-model="configs.go.compile_command"></el-input>
                            </el-form-item>
                            <el-form-item label="memory_limit_check_only">
                                <el-input v-model="configs.go.memory_limit_check_only"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="评测服务器">
                    <el-button type="primary" size="mini" @click="handleJudgeServer(1)">添加</el-button>
                    <el-button type="danger" size="mini" @click="handleJudgeServer(-1)">删除</el-button>
                    <div v-for="(judger, id) in configs.judgerhost" :key="id">
                        <el-form :inline="true" class="judgerRow">
                            <el-input v-model="configs.judgerhost[id]"></el-input>
                        </el-form>
                    </div>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item label="发布博客所需最低分数">
                    <el-input v-model="configs.leastScoreToPostBlog"></el-input>
                </el-form-item>
                <el-form-item label="查看他人代码所需最低分数">
                    <el-input v-model="configs.leastScoreToSeeOthersCode"></el-input>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item>
                    <el-button type="primary" plain @click="handleSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import { getConfig, updateConfig } from '@/api/system-admin'
import { uploadImage } from '@/api/image'
import 'mavon-editor/dist/css/index.css'
export default {
    name:"SystemSetting",
    components: { mavonEditor },
    data(){
        return {
            configs:{
                notice: '加载失败',
                c: {},
                cpp: {},
                java: {},
                python2: {},
                python3: {},
                go: {},
                leastScoreToPostBlog: -1,
                leastScoreToSeeOthersCode: -1,
                judgerhost: []
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
    mounted(){
        this.getConfigs()
    },
    methods:{
        getConfigs: function(){
            getConfig().then( res => {
                this.configs = res.data
            }).catch( err=> {
                this.$message({
                    type: 'error',
                    message: '加载失败'
                })
            })
        },
        $imgAdd1(pos, $file){
           uploadImage($file).then(res => {
               this.$refs.md1.$img2Url(pos, BASE_PATH + res.data);
           }).catch( err => {
               this.$message({
                   type: 'error',
                   message: err
               })
           })
        },
        handleJudgeServer: function(type){
            if (type === 1){
                this.configs.judgerhost.push("")
            }
            else if(type === -1){
                this.configs.judgerhost.pop()
            }
        },
        handleSubmit: function(){
            console.log(this.configs)
            updateConfig(this.configs).then( res => {
                this.$message({
                    type: 'success',
                    message: '修改成功'
                })
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: '修改失败'
                })
            })
        }
    },
    
}
</script>
<style scoped>
.systemsetting .childForm{
    margin-left: 100px;
}


.systemsetting .judgerRow{
    margin-top: 20px
}
</style>