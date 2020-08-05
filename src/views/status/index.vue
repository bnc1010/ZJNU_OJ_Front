<template>
  <div class="app-container">
      <el-card>
        <div class="box">用户名：</div>
        <div class="box">
        <el-input v-model="query.searchName" class="input-with-select" width="200"></el-input>
        </div>
        <div class="box">题目编号：</div>
        <div class="box">
        <el-input v-model="query.searchID" class="input-with-select" width="200"></el-input>
        </div>
        <div class="box">
        <el-checkbox v-model="query.onlyAccept">仅通过</el-checkbox>
        </div>
        <div class="box">
        <el-button slot="append" icon="el-icon-search"></el-button>
        </div>
    </el-card>
    <el-card class="bodybox">
    <el-table
      :data="tableData"
      style="width: 100%;font-size:11px"
      :fit="true">
      <el-table-column prop="runid" label="RUN ID" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="problem" label="题目" align="center">
        <template slot-scope="scope">
          <router-link :to="'./pdetial/' + scope.row.problem">{{scope.row.problem}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="result" label="结果" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogVisible = true" style="font-size:10px;font-weight:bold;">{{scope.row.result}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="用时(ms)" align="center"></el-table-column>
      <el-table-column prop="memory" label="内存(KB)" align="center"></el-table-column>
      <el-table-column prop="length" label="代码长度" align="center"></el-table-column>
      <el-table-column prop="language" label="语言" align="center"></el-table-column>
      <el-table-column prop="date" label="提交时间" align="center"></el-table-column>
    </el-table>

    <el-dialog title="# 用户名:  题目:  "
    :visible.sync="dialogVisible" width="66%" :before-close="handleClose">
    <el-card shadow="never"  >
            <el-table
                :data="submitDetialForm"
                border
                style="width: 100%;">
                <el-table-column
                prop="normalResult"
                label="结果"
                width="120"
                align="center">
                </el-table-column>
                <el-table-column
                prop="time"
                label="用时(ms)"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="memory"
                label="内存"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="length"
                label="代码长度"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="normalLanguage"
                label="语言"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="share"
                label="公开"
                width="100"
                align="center">
                </el-table-column>
                <el-table-column
                prop="normalSubmitTime"
                label="提交时间"
                align="center">
                </el-table-column>
            </el-table>
        </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
  data() {
    return {
        page:{
            index:1,
            size:20,
            total:0,
            query:''
            },
        query:{
            searchID: "",
            searchName: "",
            onlyAccept: true,
        },
      dialogVisible: false,
      tableData: [
        {
          runid: "0000010",
          name: "小明10",
          problem: "1010",
          result: "Accept",
          time: "0",
          memory: "2894",
          length: "988",
          language: "C",
          date: "2020-08-01 00:00:09",
          istrue: true,
        },
        {
          runid: "0000009",
          name: "小明9",
          problem: "1009",
          result: "Accept",
          time: "0",
          memory: "300",
          length: "1215",
          language: "C",
          date: "2020-08-01 00:00:08",
          istrue: true,
        },
        {
          runid: "0000008",
          name: "小明8",
          problem: "1008",
          result: "Wrong Answer",
          time: "0",
          memory: "0",
          length: "321",
          language: "Python",
          date: "2020-08-01 00:00:07",
          istrue: false,
        },
        {
          runid: "0000007",
          name: "小明7",
          problem: "1007",
          result: "Wrong Answer",
          time: "0",
          memory: "0",
          length: "650",
          language: "C",
          date: "2020-08-01 00:00:06",
          istrue: false,
        },
        {
          runid: "0000006",
          name: "小明6",
          problem: "1006",
          result: "Memory Limit Exceeded",
          time: "324",
          memory: "65535",
          length: "1824",
          language: "C",
          date: "2020-08-01 00:00:05",
          istrue: false,
        },
        {
          runid: "0000005",
          name: "小明5",
          problem: "1005",
          result: "Accept",
          time: "1056",
          memory: "2266",
          length: "895",
          language: "Java",
          date: "2020-08-01 00:00:04",
          istrue: 1,
        },
        {
          runid: "0000004",
          name: "小明4",
          problem: "1004",
          result: "Time Limit Exceeded",
          time: "2000",
          memory: "123",
          length: "1022",
          language: "C",
          date: "2020-08-01 00:00:03",
          istrue: false,
        },
        {
          runid: "0000003",
          name: "小明3",
          problem: "1003",
          result: "Wrong Answer",
          time: "0",
          memory: "655",
          length: "387",
          language: "C",
          date: "2020-08-01 00:00:02",
          istrue: false,
        },
        {
          runid: "0000002",
          name: "小明1",
          problem: "1002",
          result: "Runtime Error",
          time: "0",
          memory: "100",
          length: "920",
          language: "C",
          date: "2020-08-01 00:00:01",
          istrue: false,
        },
        {
          runid: "0000001",
          name: "小明1",
          problem: "1001",
          result: "Accept",
          time: "0",
          memory: "1",
          length: "985",
          language: "C",
          date: "2020-08-01 00:00:00",
          istrue: false,
        },
        
      ],
      submitDetialForm:[],
    };
  },
  methods: {
    handleCurrentChange: function () {
      return;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose() {
        this.dialogVisible=false
    },
    },
    mounted(){
        this.page.total=10
    }
  }
</script>
<style scoped>
.box {
  text-align: center;
  vertical-align: middle;
  margin: 5px;
  line-height: 200%;
  float: left;
}

.bodybox{
    margin-top: 20px;
}
</style>