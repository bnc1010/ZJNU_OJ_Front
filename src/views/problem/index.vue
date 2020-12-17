<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="20" :xs="24">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-input v-model="page.query" placeholder="搜索题目或题号" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
                </el-input>
              </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
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
        <el-card class="problemBox">
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
              :row-class-name="tableRowClassName"
            >
              <el-table-column
                prop="id"
                label="ID"
                width="80"
              />
              <el-table-column label="题目名称" width="350">
                <template slot-scope="scope">
                  <router-link :to="'./detial/' + scope.row.id">
                    {{ scope.row.title }}
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="标签" width="320">
                <template slot-scope="scope">
                  <div v-for="(tag,key) in scope.row.tags" :key="key" class="tagbox">
                    <el-tag size="mini">{{ tag }}&nbsp;</el-tag>&nbsp;
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="通过率" width="120">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" :content="'accept:' + scope.row.accepted + ' / submit:' + scope.row.submitted" placement="top-start">
                    <el-progress :show-text="false" :stroke-width="10" :percentage="Number(scope.row.ratio.substr(0, scope.row.ratio.length-1))" color="#5cb87a" />
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="score"
                label="积分"
                width="80"
                align="right"
              />
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

        <el-card style="margin-bottom:20px;padding:10px;">
          <div slot="header" class="clearfix">
            <span>
              <el-tooltip class="item" effect="dark" content="点击查看更多题单" placement="right">
                <router-link :to="'./problemSet'" >题目集</router-link>
              </el-tooltip>
            </span>
          </div>
          <div>
            <ul class="problemSet-ul">
              <router-link v-for="(problemset, id) in problemSet" :key="id" :to="'problemSetDetail/' + problemset.id">
                <li>
                  {{ problemset.title }}
                </li>
              </router-link>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getProblems, getTags } from '@/api/problem'
import { getProblemSetList } from '@/api/problemSet'
export default {
  name: 'Problem',
  components: {},
  data() {
    return {
      page: {
        index: 1,
        size: 20,
        total: 0,
        query: ''
      },
      search: '',
      tableData: [],
      tags: [],
      searchTag: [],
      problemSet: []
    }
  },
  mounted() {
    this.handleTags()
    this.handleProblemSet()
    this.flushProblemList()
  },
  methods: {
    handleCurrentChange: function(val) {
      this.page.index = val
      this.flushProblemList()
    },
    handleSizeChange: function(val) {
      this.page.size = val
      this.flushProblemList()
    },
    tagColor: function(key) {
      const colors = ['#2185d0', '#21ba45', '#f2711c', '#e03997', '#a5673f']
      return colors[key % colors.length]
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.ac) {
        return 'success-row'
      }
      return ''
    },
    handleTagClose: function(tag) {
      this.searchTag.splice(this.searchTag.indexOf(tag), 1)
      this.handleSearch()
    },
    handleAddSearchTag: function(tag) {
      if (this.searchTag.indexOf(tag) === -1) {
        this.searchTag.push(tag)
      }
      this.handleSearch()
    },
    flushProblemList: function() {
      getProblems(this.page.index, this.page.size, this.page.query).then(res => {
        this.tableData = res.data.content
        this.page.total = res.data.totalElements
        for (const idx in this.tableData) {
          for (const jdx in this.tableData[idx].tags) {
            this.tableData[idx].tags[jdx] = this.tableData[idx].tags[jdx].name
          }
        }
      }).catch(err => {
        console.log(err)
      })
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
    handleProblemSet: function() {
      getProblemSetList(1,5, '').then( res => {
        this.problemSet = res.data.content
      }).catch( err => {
        this.$message({
          type: 'error',
          message: err.message
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
      this.flushProblemList()
      this.page.query = temp
    }
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

.problemSet-ul{
  list-style: none;
  padding: 0;
}

.problemSet-ul li{
  height: 30px;
  font-weight: 120%;
  line-height: 30px;
  font-size: 15px;
}
</style>
