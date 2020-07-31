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
</template>
<script>
import {mavonEditor} from 'mavon-editor'
export default {
    name:'ProblemBody',
    components:{mavonEditor},
    props:{
        problem:{
            description:'',
            input:'',
            output:'',
            sampleInput:'',
            sampleOutput:'',
            hint:''
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

</style>