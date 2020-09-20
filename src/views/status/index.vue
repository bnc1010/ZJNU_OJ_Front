<template>
  <div class="app-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="box">用户名：</div>
            <div class="box">
              <el-input v-model="page.query.user" class="input-with-select" width="200" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="box">题目编号：</div>
            <div class="box">
              <el-input v-model="page.query.pid" class="input-with-select" width="200" />
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="box">
              <el-checkbox v-model="page.query.AC">仅通过</el-checkbox>
            </div>
            <div class="box">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
            </div>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple" /></el-col>
      </el-row>
    </el-card>
    <el-card class="bodybox">
      <el-table
        :data="tableData"
        style="width: 100%;font-size:11px"
        :fit="true"
      >
        <el-table-column prop="id" label="RUN ID" align="center" />
        <el-table-column prop="user.username" label="用户名" align="center" />
        <el-table-column prop="problem.id" label="题目" align="center">
          <template slot-scope="scope">
            <router-link :to="'./problem/detial/' + scope.row.problem.id">{{ scope.row.problem.id }}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="result" label="结果" align="center">
          <template slot-scope="scope">
            <el-button type="text" style="font-size:10px;font-weight:bold;" :class="handleResultColor(scope.row.result)" @click="handleShowDetial(scope.row)">{{ scope.row.result }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="用时(ms)" align="center" />
        <el-table-column label="内存" align="center">
          <template slot-scope="scope">
            {{ getSize(scope.row.memory) }}
          </template>
        </el-table-column>
        <el-table-column prop="length" label="代码长度" align="center" />
        <el-table-column prop="language" label="语言" align="center" />
        <el-table-column prop="normalSubmitTime" label="提交时间" align="center" />
      </el-table>
      <center>
        <div class="block">
          <el-pagination
            :current-page="page.index"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </center>
    </el-card>
    <el-dialog
      :visible.sync="submitDetialVisible"
      width="66%"
      :title="'#'+ submitDetial.id +' 用户名:' + submitDetial.user.username + ' 题目:' + submitDetial.problem.id"
    >
      <el-card shadow="never" class="StatuShowBox">
        <el-table
          :data="submitDetialForm"
          border
          :header-cell-style="headClass"
          style="width: 100%"
        >
          <el-table-column
            prop="normalResult"
            label="结果"
            width="220"
          />
          <el-table-column
            prop="time"
            label="用时(ms)"
            width="100"
          />
          <el-table-column
            prop="memory"
            label="内存"
            width="100"
          />
          <el-table-column
            prop="length"
            label="代码长度"
            width="100"
          />
          <el-table-column
            prop="normalLanguage"
            label="语言"
            width="100"
          />
          <el-table-column
            prop="share"
            label="公开"
            width="100"
          />
          <el-table-column
            prop="normalSubmitTime"
            label="提交时间"
          />
        </el-table>
      </el-card>
      <el-card>
        <mavonEditor
          v-model="submitDetial.source"
          :ishljs="true"
          :subfield="false"
          :box-shadow="false"
          default-open="preview"
          :toolbars-flag="false"
          :tab-size="2"
        />
      </el-card>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button  @click="handleSetShareStatu" type="primary" plain>{{submitDetial.shareButton}}</el-button> -->
        <el-button type="danger" plain @click="submitDetialVisible=false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getStatusBySubmitId } from '@/api/problem'
import { mavonEditor } from 'mavon-editor'
import { calSize, param2Obj } from '@/utils'
import { getStatus } from '@/api/status'
export default {
  name: 'Status',
  components: { mavonEditor },
  data() {
    return {
      page: {
        index: 1,
        size: 20,
        total: 0,
        query: {
          user:'',
          pid: '',
          AC: false
        }
      },
      submitDetialVisible: false,
      tableData: [],
      submitDetialForm: [],
      submitDetial: {
        user: {
          username: ''
        },
        id: -1,
        problem: {
          id: -1
        },
        source: '',
        shareButton: '设为公开'
      }
    }
  },
  mounted() {
    this.handlePathValue()
    this.flushStatusList()
  },
  methods: {
    handlePathValue: function(){
      let ob = param2Obj(window.location.href)
      if(ob.pid !== null){
        this.page.query.pid=ob.pid
      }
      if(ob.username !== null){
        this.page.query.user=ob.username
      }
      if(ob.AC !== null){
        if (ob.AC === 'true'){
          this.page.query.AC=true
        }
      }
    },
    headClass() {
      return 'text-align: center;background:#F2F6FC;'
    },
    handleSizeChange: function(val) {
      this.page.size = val
      this.flushStatusList()
    },
    handleCurrentChange: function(val) {
      this.page.index = val
      this.flushStatusList()
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleResultColor: function(result) {
      if (result == 'Accepted' || result == 'accepted') {
        return 'acClass'
      } else if (result == 'Wrong Answer' || result == 'wrong answer') {
        return 'waClass'
      } else if (result == 'Pending' || result == 'pending') {
        return 'pdClass'
      } else {
        return 'otClass'
      }
    },
    handleShowDetial: function(row) {
      this.submitDetialVisible = true
      getStatusBySubmitId(row.id).then(res => {
        this.submitDetial = res.data
        this.submitDetial.source = '```' + this.submitDetial.normalLanguage + '\n' + this.submitDetial.source + '\n```\n'
        this.submitDetial.shareButton = this.submitDetial.share ? '设为私密' : '设为公开'
        this.submitDetialForm = []
        this.submitDetialForm.push({
          normalResult: this.submitDetial.normalResult,
          time: this.submitDetial.time,
          memory: calSize(this.submitDetial.memory),
          length: this.submitDetial.length,
          normalLanguage: this.submitDetial.normalLanguage,
          normalSubmitTime: this.submitDetial.normalSubmitTime,
          share: this.submitDetial.share ? '公开' : '私密'
        })
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
        this.submitDetialVisible = false
      })
    },
    flushStatusList: function() {
      getStatus(this.page.index, this.page.size, this.page.query).then(res => {
        this.tableData = res.data.content
        this.page.total = res.data.totalElements
      }).catch(err => {
          this.$message({
          type: 'error',
          message: err.message
        })
      })
    },
    getSize: function(val) {
      return calSize(val)
    },
    handleSearch: function(){
      this.flushStatusList()
    }
  }
}
</script>
<style>
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

.acClass{
  color: #67C23A;
}

.waClass{
  color: #F56C6C;
}
.pdClass{
  color: #909399;
}
.otClass{
  color: #E6A23C;
}

.StatuShowBox td{
    font-size: 15px;
    text-align: center;
}

</style>
