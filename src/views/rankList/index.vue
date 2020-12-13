<template>
  <div class="app-container">
    <el-card class="bodybox ranklist">
      <center>
        <el-table
          :data="tableData"
          :fit="true"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="rank" label="排名" width="160" align="center" />
          <el-table-column label="用户名" width="200" align="center">
            <template slot-scope="scope">
              <router-link :to="'/userview?username=' + scope.row.username">{{ scope.row.name }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="提交数" width="160" align="center">
            <template slot-scope="scope">
              <router-link :to="'/status?username=' + scope.row.username">{{ scope.row.submitted }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="通过数" width="160" align="center">
            <template slot-scope="scope">
              <router-link :to="'/status?username=' + scope.row.username + '&AC=true'">{{
                scope.row.accepted
              }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="score" label="积分" width="300" align="center" />
        </el-table>
      </center>
      <center>
        <div class="block" style="margin: 1rem">
          <el-pagination
            :current-page="page.index"
            :page-sizes="[5, 10, 20, 50, 100]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </center>
    </el-card>
  </div>
</template>

<script>
import { getUserRanklist } from '@/api/user'

export default {
  name: 'RankList',
  data() {
    return {
      page: {
        index: 1,
        size: 20,
        total: 0,
        query: ''
      },
      tableData: []
    }
  },
  mounted() {
    this.flushUserList()
  },
  methods: {
    handleSizeChange(val) {
      this.page.size = val
      this.flushUserList()
    },
    handleCurrentChange(val) {
      this.page.index = val
      this.flushUserList()
    },
    flushUserList: function() {
      getUserRanklist(this.page.index, this.page.size).then(res => {
        this.tableData = res.data.page.content
        if (!this.tableData.find(item => item.id === res.data.userself.id)) {
          this.tableData.unshift(res.data.userself)
        }
        this.page.total = res.data.page.totalElements
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '获取列表失败'
        })
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.username === this.$store.state.user.username) {
        return 'self-row'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>


.bodybox {
  margin-top: 20px;
}


.ranklist .el-table .self-row {
  background: rgb(245, 247, 250);
}
</style>
