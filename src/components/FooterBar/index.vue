<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-12">

          <div class="timer"> {{ date }}</div>
          <div class="line" />
          <ul class="legals social">
            <li>
              <a href="http://www.zjnu.edu.cn/" title="浙江师范大学" target="_blank">
                <svg-icon icon-class="zjnu" />
              </a>
            </li>
            <li>
              <a href="mailto:zjnu-acm@outlook.com" title="联系地址">
                <svg-icon icon-class="email" />
              </a>
            </li>
            <li>
              <a href="https://github.com/bnc1010/ZJNU_OJ_Front" title="开源地址" target="_blank">
                <svg-icon icon-class="github" />
              </a>
            </li>
          </ul>
          <p class="copy">© 2020 · ZJNU-ACM · All Rights Reserved</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: 'FooterBar',
  data() {
    return {
      date: ''
    }
  },
  mounted() {
    const _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = this.getTime() // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    getTime() {
      var date1 = new Date()
      return parseTime(date1, null)
    }
  }
}
</script>
<style scoped>
footer {
    color: #8c9398;
    padding: 50px 0;
    text-align: center;
    text-transform: capitalize
}
footer p { color: #fff; }
.timer {
    list-style: none;
    color: #8c9398;
    font-size: 14px;
    margin: 5px auto;
    padding: 0px !important;
}
ul.legals {
    list-style: none;
    color: #8c9398;
    font-size: 14px;
    margin: 5px auto;
    padding: 0px !important;
}
ul.legals li { display: inline-block; padding: 0px 20px; margin: 0px;}
ul.legals li:last-child {border-right: none;}
footer .fa {padding-right: 5px;}
footer .copy {
    font-size: 10px;
    text-align: center;
    color: #404142;
}
ul.social li {padding: 0px 5px; font-size: 20px !important;}
.line {
    border-bottom: 1px solid #ababab;
    width: 170px;
    margin: 0 auto;
}
</style>
