<template>
  <div class="error-page-container">
    <h1>401 ERROR</h1>
    <a href="">返回首页</a>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.error-page-container{
  text-align: center;
  padding-top: 200px;
}
</style>
