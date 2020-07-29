<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      name:'test',
      avatar:'',
      roles:['admin'],
      user: {},
      birthday:'2020-07-29 00:00:00',
      activeTab: 'account',
      sex:1
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      let isAdmin = false
      for(let i in this.roles){
        if(this.roles[i] == 'admin'){
          isAdmin = true
        }
      }
      this.user = {
        name: this.name,
        roles: isAdmin ? '管理员' : '用户',
        avatar: this.avatar,
        sex: this.sex,
        birthday: this.birthday,
        password: '',
        checkpassword:'',
        newavatar: ''
      }
    }
  }
}
</script>
