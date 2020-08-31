<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="user.username" disabled=""/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model.trim="user.name"/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="user.email"/>
    </el-form-item>
    <el-form-item label="留言">
      <el-input v-model.trim="user.introduction"/>
    </el-form-item>
     <el-form-item label="密码">
      <el-input type="password" v-model.trim="user.password" />
    </el-form-item>
     <el-form-item label="重复密码">
      <el-input type="password" v-model.trim="user.checkpassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import { updateInfo } from '@/api/user'
// import { setAvater, setBirthday, setSex } from '@/utils/userInfo'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          roles: [],
          avatar: '',
          sex: 0,
          birthday: '',
          password: '',
          checkpassword:'',
          newavatar: ''
        }
      }
    }
  },
  computed:{
    getSex:function(){
      return this.user.sex == 1 ? '男' : '女'
    }
  },
  methods: {
    submit() {
      return
      // if (this.user.password.length != 0){
      //   if(this.user.password.length < 6){
      //     this.$message({
      //       type:'warning',
      //       message:'密码长度不能小于6'
      //     })
      //     return
      //   }
      //   if(this.user.password != this.user.checkpassword){
      //     this.$message({
      //       type:'warning',
      //       message:'两次密码不一致'
      //     })
      //     return
      //   }
      // }
      // if(this.user.sex != 1 && this.user.sex != 0){
      //     this.$message({
      //       type:'warning',
      //       message:'性别请输入0或1,0为女性，1为男性'
      //     })
      //     return
      //   }
      //   this.user.avatar = this.user.newavatar
      //   updateInfo(this.user).then(res => {
      //     this.$message({
      //       type: 'success',
      //       message: '更新成功，信息将在重新登录后生效'
      //     })
      //     setAvater(this.user.avatar)
      //     setBirthday(this.user.birthday)
      //     setSex(this.user.sex)
      //   }).catch(err => {
      //     this.$message({
      //       type: 'error',
      //       message: '更新失败'
      //     })
      //   })
    }
  }
}
</script>
