<template>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
            <tagCard />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
              <el-table
                :data="tableData"
                :fit="true"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="problem"
                    label="题目名称"
                    width="350">
                </el-table-column>
                <el-table-column label="标签" width="370">
                    <template slot-scope="scope">
                        <div v-for="(tag,key) in scope.row.tags" :key="key" class="tagbox">
                            <el-tag  size="mini" >{{tag }}&nbsp;</el-tag>&nbsp;
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="通过率" width="120">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="'ac:' + scope.row.ac + ' / submit:' + scope.row.total" placement="top-start">
                            <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.acrate" color="#5cb87a" ></el-progress>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="积分">
                </el-table-column>
                </el-table>
                <div class="pagebar">
                    <center>
                        <el-pagination
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :page-size="this.pagesize"
                        :total="this.pagetotal"
                        ></el-pagination>
                    </center>
                </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import tagCard from './components/TagCard'
export default {
    name: "problem",
    components:{tagCard} ,
    data(){
        return {
            pagetotal: 600,
            pagesize: 10,
            tableData: [{
                id: '1',
                problem: 'test1',
                tags: ['组合数学', '贪心', '搜索', '二分图'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
                }, {
                id: '2',
                problem: 'test2',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
                }, {
                id: '3',
                problem: 'test3',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
                }, {
                id: '4',
                problem: 'test4',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
                }, {
                id: '5',
                problem: 'test5',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
                }, {
                id: '6',
                problem: 'test6',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
                }, {
                id: '7',
                problem: 'test7',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50
            }]
        }
    },
    methods:{
        handleCurrentChange: function(){
            ret
        }
    }
}
</script>
<style lang='scss' scoped>
.pagebar{
    margin: auto;
    width: 100%;
}
.tagbox{
    float: left;
    margin: auto 2px;
}
</style>