<template>
  <div class="error-page-container">
    <h1>404 ERROR</h1>
    <a href="">返回首页</a>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
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
