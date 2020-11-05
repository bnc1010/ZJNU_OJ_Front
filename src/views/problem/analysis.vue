<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="18" :xs="24">
                <el-card>
                    <mavonEditor
                    v-model="analysis.text"
                    :ishljs="true"
                    :subfield="false"
                    :box-shadow="false"
                    default-open="preview"
                    :toolbars-flag="false"
                    :tab-size="2"
                    />
                </el-card>
            </el-col>
            <el-col :span="6" :xs="24">
                <el-card>
                    <p>作者: {{ analysis.user.username }}</p>
                    <p>发表时间: {{ analysis.normalPostTime }}</p>
                    <el-button plain type="primary" @click="handleShowEdit">编辑</el-button>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog
      :visible.sync="editAnalysisVisible"
      width="75%"
    >
      <el-card shadow="never">
        <mavonEditor
        ref=md1
        v-model="editAnalysis"
        :ishljs="true"
        :subfield="true"
        :boxShadow="false"
        :toolbars="toolbars"
        @imgAdd="$imgAdd"
        :autofocus="false">
        </mavonEditor>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="handleSubmitAnalysis">发 表</el-button>
        <el-button type="danger" plain @click="editAnalysisVisible = false">取 消</el-button>
      </span>
      
    </el-dialog>
    </div>
</template>
<script>
import { param2Obj } from '@/utils'
import { getAnalysisById, getEditAnalysis, editAnalysis } from '@/api/problem'
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
import { uploadImage } from '@/api/image'
import { BASE_PATH } from '@/api/config'

export default {
    name: 'Analysis',
    components: { mavonEditor },
    data(){
        return {
            analysisId: -1,
            analysis: {
                user:{}
            },
            editAnalysisVisible: false,
            editAnalysis: '',
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
        let obj = param2Obj(window.location.href)
        if(obj == null || obj.id == null){
            this.$message({
                type:'error',
                message: '参数错误'
            })
            return
        }
        this.analysisId = obj.id
        this.flushAnalysis()
    },
    methods:{
        flushAnalysis: function() {
            getAnalysisById(this.analysisId).then( res => {
            this.analysis = res.data
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleShowEdit: function() {
            getEditAnalysis(this.analysisId).then( res => {
                this.editAnalysis = res.data.text
                this.editAnalysisVisible = true
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        $imgAdd(pos, $file){
            uploadImage($file).then(res => {
                this.$refs.md1.$img2Url(pos, BASE_PATH + res.data);
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        handleSubmitAnalysis: function() {
            if(this.editAnalysis.length<10 || this.editAnalysis.length>5000){
                this.$message({
                    type: 'error',
                    message: '单篇题解字数在10-5000范围内'
                })
                return
            }
            editAnalysis(this.analysisId, this.editAnalysis).then( res => {
                this.$message({
                    type: 'success',
                    message: '编辑成功'
                })
                this.editAnalysisVisible = false
                this.flushAnalysis()
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