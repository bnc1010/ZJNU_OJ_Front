<template>
    <div class="app-container">
      <el-row :gutter="20">
        <el-col :span="5" :xs="24">
            <el-card style="margin-bottom:20px;">
                <div slot="header" class="clearfix">
                <span>题目标签</span>
                </div>
                <div class="tagsbox">
                    <div class="box-center">
                        <div v-for="(tag,key) in tags" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark" @click="handleAddSearchTag(tag)">{{tag }}&nbsp;</el-tag>&nbsp;
                        </div>
                    </div>
                </div>
            </el-card>
        </el-col>
        <el-col :span="19" :xs="24">
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-input placeholder="搜索题目或题号" v-model="searchText" class="input-with-select">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div v-for="(tag,key) in searchTag" :key="key" class="tagbox">
                            <el-tag class="tagboard" size="mini" effect="dark" closable :key="key" @close="handleTagClose(tag)">{{tag}}&nbsp;</el-tag>&nbsp;
                        </div>
                        </div>
                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                </el-row>
            </el-card>
            <el-card>
            <center>
              <el-table
                :data="tableData"
                :fit="true"
                style="width: 100%"
                :row-class-name="tableRowClassName">>
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
                <el-table-column label="标签" width="320">
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
                    label="积分"
                    width="80"
                    align="right">
                </el-table-column>
                </el-table>
            </center>
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
export default {
    name: "problem",
    components:{} ,
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
                acrate: 50,
                ac: false
                }, {
                id: '2',
                problem: 'test2',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50,
                ac: false
                }, {
                id: '3',
                problem: 'test3',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50,
                ac: true
                }, {
                id: '4',
                problem: 'test4',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50,
                ac: false
                }, {
                id: '5',
                problem: 'test5',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50,
                ac: false
                }, {
                id: '6',
                problem: 'test6',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50,
                ac: false
                }, {
                id: '7',
                problem: 'test7',
                tags: ['组合数学', '贪心'],
                ac: 5,
                total: 10,
                value: 10,
                acrate: 50,
                ac: true
            }],
            tags:['组合数学', '贪心', '搜索', '二分图', '计算几何', '容斥', '模拟'],
            searchText: '',
            searchTag: ['组合数学']
        }
    },
    methods:{
        handleCurrentChange: function(){
            return 
        },
        tagColor: function(key){
            let colors = ['#2185d0', '#21ba45', '#f2711c', '#e03997', '#a5673f']
            return colors[key%colors.length]
        },
        tableRowClassName({row, rowIndex}) {
            if (row.ac) {
                return 'success-row';
            }
            return '';
        },
        handleTagClose :function(tag){
            this.searchTag.splice(this.searchTag.indexOf(tag), 1)
            console.log(this.searchTag)
        },
        handleAddSearchTag :function(tag){
            if(this.searchTag.indexOf(tag)===-1){
                this.searchTag.push(tag)
            }
        }
    },
    computed: {
        
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
}

.tagsbox .tagbox{
    float: left;
    margin: 6px 2px;
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

</style>