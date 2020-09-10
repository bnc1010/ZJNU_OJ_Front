<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" @changeAvatar="handleChangeAvatar"/>
          <AbilityCard :chartData="chartData" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="用户信息"  name="account">
                <account :user="user" />
              </el-tab-pane>
              <el-tab-pane label="做题记录" name="history">
                <timeline  />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <SingleImageUpload @imageUrlCallback="handleAvatarCallback"></SingleImageUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAvatarUpload">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import AbilityCard from './components/AbilityCard'
import SingleImageUpload from '@/components/Upload/SingleImage'
import { changeAvatar, getPie } from '@/api/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  components: { UserCard, Timeline, Account, AbilityCard, SingleImageUpload},
  data() {
    return {
      activeTab: 'account',
      chartData:[0,0,0,0,0,0,0,0],
      dialogVisible: false,
      tmpavatar:'',
      user:{},
    }
  },
  computed: {
    ...mapGetters([
      'userid',
      'name',
      'username',
      'email',
      'avatar',
      'roles',
      'introduction'
    ])
  },
  created() {
    this.flushPie()
    this.getUser()
  },
  methods: {
    getUser() {
      let isAdmin = false
      for(let i in this.roles){
        if(this.roles[i] == 'admin' || this.roles[i] == 'root'){
          isAdmin = true
        }
      }
      this.user = {
        name: this.name,
        roles: isAdmin ? '管理员' : '用户',
        avatar: this.avatar,
        name: this.name,
        username: this.username,
        email: this.email,
        intro: this.introduction,
        password: '',
        oldpassword: '',
        checkpassword:'',
      }
    },
    handleChangeAvatar: function(){
      this.dialogVisible=true
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleAvatarCallback: function(imageUrl){
      this.tmpavatar=imageUrl
    },
    handleAvatarUpload: function(){
      changeAvatar(this.tmpavatar).then(res => {
        this.$message({
          type: 'success',
          message: '头像修改成功'
        })
        
        this.$store.dispatch("user/setAvatar", this.tmpavatar)
        this.getUser()
        this.dialogVisible = false
      }).catch( err=> {
          console.log(err)
          this.$message({
          type: 'error',
          message: '头像修改失败'
        })
      })
    },
    flushPie: function(){
      getPie(this.userid).then(res => {
        this.chartData = []
        this.chartData.push(res.data.radar.dynamic_programming)
        this.chartData.push(res.data.radar.data_structure)
        this.chartData.push(res.data.radar.math)
        this.chartData.push(res.data.radar.geometry)
        this.chartData.push(res.data.radar.graph_theory)
        this.chartData.push(res.data.radar.search)
        this.chartData.push(res.data.radar.probability)
        this.chartData.push(res.data.radar.string)
      })
    }
  }
}
</script>
