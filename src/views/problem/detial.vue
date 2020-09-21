<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="18" :xs="24">
        <el-card class="problemHeader">
          <el-row>
            <h1>{{ problem.title }}</h1>
            <div class="tag-group">
              <el-tag
                v-for="(item, key) in problemData[0]"
                :key="key"
                :hit="false"
                type="info"
                style="margin: .2rem .2rem"
                effect="light"
              >
                {{ key }} : {{ item }}
              </el-tag>
            </div>
          </el-row>
        </el-card>
        <problemBody :problem="problem" />
        <el-card class="codeEditor">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="选择语言:">
              <el-select v-model="submitOption.selectedLang" size="small" class="langSelecter" @change="handleLangChanged">
                <el-option
                  v-for="(item,key) in langOptions"
                  :key="key"
                  :label="item.label"
                  :value="key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="是否公开">
              <el-switch
                v-model="submitOption.share"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
          </el-form>
          <el-divider />
          <codemirror v-model="submitOption.code" :options="cmOptions" />
          <el-divider />
          <el-button type="primary" @click="handleSubmitCode">提交</el-button>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24">
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>题目标签</span>
          </div>
          <div class="tagsbox">
            <div class="box-center">
              <div v-for="(tag,key) in problem.tags" :key="key" class="tagbox">
                <el-tag class="tagboard" size="mini" :color="tagColor(key)" effect="dark">{{ tag.name }}&nbsp;</el-tag>&nbsp;
              </div>
            </div>
          </div>
        </el-card>
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="divCardHeader">
            <div class="divCardHeaderTitle">
              <div class="titleContent">
                最近提交
                <i class="el-icon-refresh-right" @click="handleflushLastSubmit" />
              </div>
            </div>
            <div class="divMore">
              <router-link :to="'/status?pid=' + problem.id + '&username=' + getUsername">more</router-link>
            </div>
          </div>
          <div class="submitShowBox">
            <el-table
              :data="submits"
              border
              :header-cell-style="headClass"
              :row-class-name="tableRowClassName"
              style="width: 100%"
              @row-click="handleSubmitRowClick"
            >
              <el-table-column
                prop="result"
                label="提交结果"
                width="150"
              />
              <el-table-column
                prop="normalSubmitTime"
                label="提交时间"
              />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
        <el-button type="primary" plain @click="handleSetShareStatu">{{ submitDetial.shareButton }}</el-button>
        <el-button type="danger" plain @click="submitDetialVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { calSize, paramOfResultfulUrl } from '@/utils'
import problemBody from './components/ProblemBody'
import { getStatusBySubmitId, setStatuShareBySubmitId, submitCode, getProblemById, getLastSubmits } from '@/api/problem'
import 'mavon-editor/dist/css/index.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/go/go.js'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/theme/ttcn.css'
import config from '@/utils/config'
import { mavonEditor } from 'mavon-editor'
export default {
  components: { codemirror, problemBody, mavonEditor },
  data() {
    return {
      problem: {},
      problemData: [],
      submits: [],
      submitDetialVisible: false,
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
      },
      submitDetialForm: [],
      cmOptions: config.CMOptions,
      langOptions: config.LangOptions,
      submitOption: {
        selectedLang: 0,
        share: true,
        code: '',
        problemId: -1
      }
    }
  },
  computed: {
    getUsername: function() {
      return this.$store.state.user.username
    }
  },
  mounted() {
    getProblemById(paramOfResultfulUrl(window.location.href)).then(res => {
      this.problem = res.data
      this.problemData.push({
        timeLimit: this.problem.timeLimit + 'ms',
        memoryLimit: calSize(this.problem.memoryLimit),
        submitted: this.problem.submitted,
        accepted: this.problem.accepted,
        score: this.problem.score,
        source: this.problem.source
      })
      this.submitOption.problemId = this.problem.id
    }).catch(err => {
      this.$message({
        message: '加载失败',
        type: 'error'
      })
    })
    this.flushLastSubmit()
    console.log(this.problemData[0])
  },
  methods: {
    headClass() {
      return 'text-align: center;background:#F2F6FC;'
    },
    // 表格样式设置
    rowClass() {
      return 'text-align: center;'
    },
    tagColor: function(key) {
      const colors = ['#2185d0', '#21ba45', '#f2711c', '#e03997', '#a5673f']
      return colors[key % colors.length]
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.result == 'Accepted') {
        return 'success-row'
      } else if (row.result == 'Wrong Answer') {
        return 'error-row'
      }
      return ''
    },
    handleSubmitRowClick: function(row) {
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
        this.submitDetial.shareButton = this.submitDetial.share ? '设为私密' : '设为公开'
      }).catch(err => {
        this.submitDetialVisible = false
      })
    },
    handleSetShareStatu: function() {
      setStatuShareBySubmitId(this.submitDetial.id).then(res => {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.submitDetial.share = !this.submitDetial.share
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
        console.log()
        this.submitDetial.shareButton = this.submitDetial.share ? '设为私密' : '设为公开'
      }).catch(err => {
        console.log(err)
      })
    },
    handleLangChanged: function(value) {
      this.cmOptions.mode = this.langOptions[value].value
    },
    handleSubmitCode: function() {
      submitCode(this.submitOption.problemId, this.langOptions[this.submitOption.selectedLang].key, this.submitOption.share, this.submitOption.code).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.$router.push('/status')
      }).catch(err => {
        this.$message({
          message: '提交失败',
          type: 'error'
        })
      })
    },
    flushLastSubmit: function() {
      getLastSubmits(paramOfResultfulUrl(window.location.href)).then(res => {
        this.submits = res.data
      }).catch(err => {
        this.$message({
          message: '最近提交加载失败',
          type: 'error'
        })
      })
    },
    handleflushLastSubmit: function() {
      this.flushLastSubmit()
    }
  }
}
</script>
<style>
.el-table .success-row {
    background: #f0f9eb;
}

.el-table .error-row {
    background: #FDE2E2;
}

.problemHeader{
    text-align: center;
}

.problemHeader .el-table tbody tr:hover>td {
    background-color:#ffffff!important
}

.tagsbox{
    float: left;
}

.tagsbox .tagbox{
    float: left;
    margin: 6px 2px;
}

.tagsbox .tagbox :hover{
    cursor: default;
}

.submitShowBox td{
    font-size: 10px;
    text-align: center;
    font-weight: bold;
}

.submitShowBox td :hover{
    cursor: default;
}

.StatuShowBox td{
    font-size: 15px;
    text-align: center;
}

.submitShowBox td :hover{
    cursor: default;
}

.codeEditor{
    margin-top: 50px;
}

.langSelecter{
    height: 100%;
}

.divCardHeader{
    height: 20px;
}

.divCardHeader .divCardHeaderTitle{
    float: left;
    height: 100%;
    line-height: 100%;
}
.divCardHeader .divCardHeaderTitle .titleContent{
    margin-left: 0;
    margin-top: auto;
}
.divMore{
    float: right;
    font-size: 13px;
}
</style>
