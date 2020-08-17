<template>
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
        <div class="copyBox">
            <div>
            <h2>样例输入</h2>
            </div>
            <div class="copyButton">
                <h3>
                    <i v-clipboard:copy="problem.sampleInput" v-clipboard:success="clipboardSuccess" type="info" class="el-icon-document"></i>
                </h3>
            </div>
        </div>
        <mavonEditor v-model="problem.sampleInput"
        :ishljs="true"
        :subfield="false"                                    
        :boxShadow="false"                                    
        defaultOpen="preview"                                    
        :toolbarsFlag="false" 
        ></mavonEditor>
        <el-divider></el-divider>
        <div class="copyBox">
            <div>
            <h2>样例输出</h2>
            </div>
            <div class="copyButton">
                <h3>
                    <i v-clipboard:copy="problem.sampleOutput" v-clipboard:success="clipboardSuccess" type="info" class="el-icon-document"></i>
                </h3>
            </div>
        </div>
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
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
export default {
    name:'ProblemBody',
    components:{mavonEditor},
    directives: {clipboard},
    props:{
        problem:{
            description:'',
            input:'',
            output:'',
            sampleInput:'',
            sampleOutput:'',
            hint:''
        }
    },
    methods:{
        handleCopy(text, event) {
            clip(text, event)
        },
        clipboardSuccess() {
        this.$message({
            message: '已复制到剪贴板',
            type: 'success',
            duration: 1500
        })
        }
    }
}
</script>
<style scoped>
.problemBody{
    margin-top: 5px;
}
.problemBody .v-note-wrapper{
    min-height: 50px;
    z-index: auto;
}

.copyBox{
    width: 100%;
    height: 80px;
}

.copyBox div{
    float: left;
}

</style>