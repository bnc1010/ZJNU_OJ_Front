<template>
  <div class="app-container">
    <el-card>
      <div class="grid-content bg-purple">
        <el-input placeholder="搜索排名或姓名" v-model="page.query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      </el-card>
      <el-card class="bodybox">
        <center>
          <el-table
            :data="tableData"
            :fit="true"
            style="width: 100%"
          >
            <el-table-column prop="rank" label="排名" width="160" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
            <el-table-column prop="submit" label="提交数" width="160" align="center"></el-table-column>
            <el-table-column prop="accept" label="通过数" width="160" align="center"></el-table-column>
            <el-table-column prop="ratio" label="正确率" width="200" align="center"></el-table-column>
            <el-table-column prop="total" label="总分" width="300" align="center"></el-table-column>
          </el-table>
        </center>
        <center>
          <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.index"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </center>
    </el-card>
  </div>
</template>

<script>
export default {
    name:'RankList',
    data() {
        return {
            page:{
                index:1,
                size:20,
                total:0,
                query:''
            },
            tableData: [
                {
                rank: "1",
                name: "小明1",
                submit: "1000",
                accept:"1000",
                ratio:"100%",
                total:"10000",
                self:false,
                },
                {
                rank: "2",
                name: "小明2",
                submit: "999",
                accept:"999",
                ratio:"100%",
                total:"9990",
                self:false,
                },
                {
                rank: "3",
                name: "小明3",
                submit: "998",
                accept:"998",
                ratio:"100%",
                total:"9980",
                self:false,
                },
                {
                rank: "4",
                name: "小明4",
                submit: "997",
                accept:"997",
                ratio:"100%",
                total:"9970",
                self:false,
                },
                {
                rank: "5",
                name: "小明5",
                submit: "996",
                accept:"996",
                ratio:"100%",
                total:"9960",
                self:true,
                },
                {
                rank: "6",
                name: "小明6",
                submit: "995",
                accept:"995",
                ratio:"100%",
                total:"9950",
                self:false,
                },
                {
                rank: "7",
                name: "小明7",
                submit: "994",
                accept:"994",
                ratio:"100%",
                total:"9940",
                self:false,
                },
                {
                rank: "8",
                name: "小明8",
                submit: "993",
                accept:"993",
                ratio:"100%",
                total:"9930",
                self:false,
                },
                {
                rank: "9",
                name: "小明9",
                submit: "992",
                accept:"992",
                ratio:"100%",
                total:"9920",
                self:false,
                },
                {
                rank: "10",
                name: "小明10",
                submit: "991",
                accept:"0",
                ratio:"0%",
                total:"0",
                self:false,
                }],
            };
    },
    methods:{
        handleCurrentChange: function(){
                return 
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    },
    mounted(){
        this.page.total=10
    }
};
</script>
<style lang="scss" scoped>
.bodybox{
  margin-top: 20px;
}
</style>
