<template>
    <div class="app-container">
        <el-card>
            <center>
                <h1>{{ problemSet.title }}</h1>
            </center>
        </el-card>

        <el-row :gutter="20" class="body-content">
            <el-col :span="8">
                <el-card>
                    <mavonEditor
                    v-model="problemSet.description"
                    :ishljs="true"
                    :subfield="false"
                    :box-shadow="false"
                    default-open="preview"
                    :toolbars-flag="false"
                    :tab-size="2"
                    />
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <ul style="overflow:auto" class="problem-list">
                        <router-link v-for="(problem, id) in showProblem" :key="id" :to="'/problem/detial/' + problem.id">
                            <li>{{ problem.title }}</li>
                        </router-link>
                        <li v-if="ind < problemSet.problems.length" @click="loadProblems" class="loadmore">
                            加载更多
                        </li>
                    </ul>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>

import { paramOfResultfulUrl } from '@/utils'
import { getProblemSetById } from '@/api/problemSet'
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'
export default {
    name: 'ProblemSeetDetail',
    components: { mavonEditor },
    data(){
        return {
            problemSetId: -1,
            problemSet: {
                problems:[]
            },
            showProblem: [],
            ind:0
        }
    },
    mounted(){
        this.problemSetId = paramOfResultfulUrl(window.location.href)
        if(this.problemSetId == null || this.problemSetId < 1){
            this.$message({
                type:'error',
                message: '非法进入此页面'
            })
            return
        }
        this.getProblemSet()
        this.ind=0
    },
    methods:{
        getProblemSet: function() {
            getProblemSetById(this.problemSetId).then( res => {
                this.problemSet = res.data
                this.loadProblems()
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        loadProblems: function(){
            let tmp = this.ind
            for(;this.ind< tmp + 10 && this.ind < this.problemSet.problems.length; this.ind++){
                this.showProblem.push(this.problemSet.problems[this.ind])
            }
            console.log(this.showProblem)
        }
    }
}
</script>
<style scoped>
.body-content{
    margin-top: 20px;
}

.problem-list{
    list-style: none;
}

.problem-list li{
    height: 50px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 120%;
}

.problem-list li:hover{
    background-color: beige;
}

.loadmore{
    text-align: center;
    font-size: 14px !important;
    cursor: pointer;
}

</style>