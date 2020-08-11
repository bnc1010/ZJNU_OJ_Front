<template>
  <div class="app-container">
    <el-card>
      <mavonEditor
        v-model="content"
        :ishljs="true"
        :subfield="false"
        :box-shadow="false"
        default-open="preview"
        :toolbars-flag="false"
      />
    </el-card>
  </div>
</template>
<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { getNotice } from '@/api/oj-common'

export default {
  name: 'Home',
  components: {
    mavonEditor
  },
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    this.handleNotice()
  },
  methods: {
    handleNotice: function() {
      getNotice().then(res => {
        this.content = res.data
      }).catch(err => {
        console.log(err)
        this.content = '### 公告加载失败'
      })
    }
  }
}
</script>
<style scoped>
.v-note-wrapper{
    min-height: 50px;
    z-index: auto;
}
</style>
