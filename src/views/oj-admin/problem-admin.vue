<template>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="20" :xs="24">
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-input placeholder="搜索题目" v-model="page.query" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-button type="primary" plain @click="handleAdd">新建题目</el-button>
                    </div></el-col>
                </el-row>
            </el-card>
            <el-card class="problemBox">
            <div class="pagebar">
                <center>
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.index"
                    :page-sizes="[20, 50, 100]"
                    :page-size="page.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
                    </el-pagination>
                </center>
            </div>
            <el-divider></el-divider>
            <center>
              <el-table
                :data="tableData"
                :fit="true"
                style="width: 100%"
                >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="80">
                </el-table-column>
                <el-table-column label="题目名称" width="320">
                    <template slot-scope="scope">
                        <router-link :to="'/problem/detial/' + scope.row.id">
                            {{scope.row.title}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="320">
                    <template slot-scope="scope">
                        <div v-for="(tag,key) in scope.row.tags" :key="key" class="tagbox">
                            <el-tag  size="mini" >{{tag }}&nbsp;</el-tag>&nbsp;
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="通过率" width="120">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="'ac:' + scope.row.accepted + ' / submit:' + scope.row.submitted" placement="top-start">
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="Number(scope.row.ratio.substr(0, scope.row.ratio.length-1))" color="#5cb87a" ></el-progress>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="积分"
                    width="80"
                    align="center">
                </el-table-column>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-button type="warning" plain size="small" @click="handleUpdate(scope.row.id)">update</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </center>
            <el-divider></el-divider>
                <div class="pagebar">
                    <center>
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.index"
                        :page-sizes="[20, 50, 100]"
                        :page-size="page.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                        </el-pagination>
                    </center>
                </div>
            </el-card>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import { getProblemList } from '@/api/oj-admin'
import {getProblems, getTags} from '@/api/problem'
export default {
    name: "ProblemAdmin",
    components:{} ,
    data(){
        return {
            page:{
                index:1,
                size:20,
                total:0,
                query:''
            },
            search:'',
            tableData: [],
            tags:[],

        }
    },
    methods:{
        handleCurrentChange: function(val){
            this.page.index=val
            this.flushProblemList()
        },
        handleSizeChange: function(val){
            this.page.size=val
            this.flushProblemList()
        },
        flushProblemList: function(){
            getProblemList(this.page.index, this.page.size, this.page.query).then(res => {
                this.tableData=res.data.content
                for(let idx in res.data.content){
                    for(let jdx in this.tableData[idx].tags){
                        this.tableData[idx].tags[jdx]=this.tableData[idx].tags[jdx].name
                    }
                }
                this.page.total=res.data.totalPages
            }).catch(err => {
                console.log(err)
                this.$message({
                    type:'error',
                    message: '加载题目列表失败'
                })
            })
        },
        handleUpdate: function(problemId){
             this.$router.push({
                 path: '/ojAdmin/problem/edit/' + problemId
             })
        },
        handleAdd: function(problemId){
             this.$router.push({
                 path: '/ojAdmin/problem/add'
             })
        },
        handleSearch: function(){
            console.log(this.page)
            this.flushProblemList()
        }
    },
    mounted(){
        this.flushProblemList()
    }
}
</script>
<style lang='scss'>
.el-table .success-row {
    background: #f0f9eb;
}

.pagebar{
    margin: auto;
    width: 100%;
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

.el-col{
    border: 1px solid transparent; 
}

.problemBox{
    margin-top: 20px;
}

</style>
