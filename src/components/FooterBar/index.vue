<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="legals social">
            <li>
              <a href="http://weibo.com/briniceapp" title="微博">
                <i class="fa fa-weibo"></i>
              </a>
            </li>
            <li>
              <a href="mailto:zjnu-acm@outlook.com" title="商务合作">
                <svg-icon icon-class="email"></svg-icon>
                <i class="fa fa-envelope-o"></i>
              </a>
            </li>
          </ul>
          <div class="line"></div>
          <p class="copy">© 2020 · ZJNU-ACM · All Rights Reserved</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
    name: 'footerBar'
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