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
                <el-col :span="6"></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
                <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div v-for="(tag,key) in searchTag" :key="key" class="tagbox">
                    <el-tag :key="key" class="tagboard" size="mini" effect="dark" closable @close="handleTagClose(tag)">{{ tag }}&nbsp;</el-tag>&nbsp;
                    </div>
                </div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
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
                    <router-link :to="'/problem/problemSetDetail/' + scope.row.id">
                        {{ scope.row.title }}
                    </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="350">
                    <template slot-scope="scope">
                    <div v-for="(tag,key) in scope.row.tags" :key="key" class="tagbox">
                        <el-tag size="mini">{{ tag.name }}&nbsp;</el-tag>&nbsp;
                    </div>
                    </template>
                </el-table-column>
                <el-table-column label="创建者" width="200">
                    <template slot-scope="scope">
                        {{ scope.row.creator.username }}
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
              <el-col :span="4" :xs="24">
        <el-card style="margin-bottom:20px;padding:10px;">
          <div slot="header" class="clearfix">
            <span>题目标签</span>
          </div>
          <div class="tagsbox">
            <div class="box-center">
              <div v-for="(tag,key) in tags" :key="key" class="tagbox">
                <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark" @click="handleAddSearchTag(tag)">{{ tag }}&nbsp;</el-tag>&nbsp;
              </div>
            </div>
          </div>
          </el-card>
      </el-col>
    </el-row>
</div>
</template>
<script>
import { getProblemSetList } from '@/api/problemSet'
import { getTags } from '@/api/problem'
export default {
    name: 'ProblemSet',
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
            searchTag: []
        }
    },
    mounted(){
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
        flushList: function(){
            getProblemSetList(this.page.index, this.page.size, this.page.query).then( res => {
                this.tableData = res.data.content
                this.page.total = res.data.totalElements
            }).catch( err => {
                this.$message({
                    type: 'error',
                    message: err.message
                })
            })
        },
        handleAddSearchTag: function(tag) {
            if (this.searchTag.indexOf(tag) === -1) {
                this.searchTag.push(tag)
            }
        },
        handleTags: function() {
            getTags().then(res => {
                this.tags = []
                for (const idx in res.data) {
                this.tags.push(res.data[idx].name)
                }
            }).catch(err => {
                console.log(err)
                this.$message({
                type: 'error',
                message: '标签加载失败'
                })
            })
        },
        handleSearch: function() {
            let temp = this.page.query
            if (this.searchTag.length !== 0) {
                this.page.query += '$$'
                for (const idx in this.searchTag) {
                this.page.query += this.searchTag[idx] + ','
                }
            }
            this.flushList()
            this.page.query = temp
        },
        handleTagClose: function(tag) {
            this.searchTag.splice(this.searchTag.indexOf(tag), 1)
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