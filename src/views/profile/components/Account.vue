<template>
  <el-form label-position="left" label-width="80px">
    <el-form-item label="用户名">
      <el-input style="width:50%" v-model.trim="user.username" disabled="" />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input style="width:50%" v-model.trim="user.name"/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input style="width:50%" v-model.trim="user.email"/>
    </el-form-item>
    <el-form-item label="简介">
      <el-input style="width:50%" v-model.trim="user.intro"/>
    </el-form-item>
    <el-form-item label="原密码">
      <el-input style="width:50%" type="password" v-model.trim="user.oldpassword" />
    </el-form-item>
     <el-form-item label="新密码">
      <el-input style="width:50%" type="password" placeholder="不修改密码不要填写" v-model.trim="user.password" />
    </el-form-item>
     <el-form-item label="重复密码">
      <el-input style="width:50%" type="password" v-model.trim="user.checkpassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateInfo } from '@/api/user'
import { validEmail } from '@/utils/validate'


export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          roles: [],
          avatar: '',
          password: '',
          email:'',
          oldpassword: '',
          checkpassword:'',
          newavatar: ''
        }
      }
    }
  },
  computed:{

  },
  methods: {
    submit() {
      if (this.user.password.length != 0){
        if(this.user.password.length < 6){
          this.$message({
            type:'warning',
            message:'密码长度不能小于6'
          })
          return
        }
        if(this.user.password != this.user.checkpassword){
          this.$message({
            type:'warning',
            message:'两次密码不一致'
          })
          return
        }
      }
      if(!validEmail(this.user.email)){
        this.$message({
            type:'warning',
            message:'邮箱格式不正确'
          })
          return
      }
      updateInfo(this.user).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.$store.dispatch("user/updateInfo", this.user)
        this.user.password = this.user.oldpassword = this.user.checkpassword = ''
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    }
  }
}
</script>
