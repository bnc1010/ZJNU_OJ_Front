<template>
    <div>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px" class="register-box">
      <h3 class="register-title">注册</h3>
      <el-form-item label="账号" prop="username" >
        <el-input ref="username" type="text" placeholder="请输入用户名" v-model="registerForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input ref="password" type="password" placeholder="请输入密码" v-model="registerForm.password"/>
      </el-form-item>
      <el-form-item label="重复密码" prop="password2">
        <el-input type="password" placeholder="请第二次输入密码" v-model="registerForm.password2"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('registerForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validUsername } from '@/utils/validate'
export default {
    name: "Register",
    data() {
        const validateUsername = (rule, value, callback) => {
            if (validUsername(value)) {
                callback(new Error('请输入合法的用户名'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码长度应大于等于6'))
            } else {
                callback()
            }
        }
        const validateTwicePassword = (rule, value, callback) => {
            if(this.registerForm.password != this.registerForm.password2){
                callback(new Error('两次密码不一致'))
            } else {
                callback()
            }
        }
      return {
        registerForm: {
          username: '',
          password: '',
          password2: ''
        },

        rules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePassword}],
          password2:[{required:true, trigger: 'blur', validator: validateTwicePassword}]
        },

      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // todo: 需要引入api验证
            this.$router.push("/login");
          } else {
            this.$message.error('注册失败');
            return false;
          }
        });
      }
    },
    mounted() {
        if (this.registerForm.username === '') {
            this.$refs.username.focus()
        } else if (this.registerForm.password === '') {
            this.$refs.password.focus() 
        }
  },
}

</script>
<style scoped>
.register-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .register-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>