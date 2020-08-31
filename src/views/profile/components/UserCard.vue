<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="divCardHeader">
      <div class="divCardHeaderTitle">
        <div class="titleContent">
          我的信息
        </div>
      </div>
      <div class="divChangeAvater">
        <el-button plain size="mini" @click="handleChangeAvater">更换头像</el-button>
      </div>
    </div>
    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'">
          <div class="user-role text-center text-muted">{{ user.roles }}</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}
          <div v-if="user.sex === 0">
              <svg-icon icon-class="nv" style="fill: #FF69B4"/>
          </div>
          <div v-else-if="user.sex === 1">
            <svg-icon icon-class="nan" style="fill: #00BFFF"/>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import SingleImageUpload from '@/components/Upload/SingleImage'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          avatar: '',
          roles: '',
          sex: 0
        }
      }
    }
  },
  mounted(){
    // console.log(this.user)
  },
  methods:{
      handleChangeAvater: function() {
        this.$emit('changeAvatar')
      }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.divCardHeader{
    height: 20px;
}

.divCardHeader .divCardHeaderTitle{
    float: left;
    height: 100%;
    line-height: 100%;
}
.divCardHeader .divCardHeaderTitle .titleContent{
    margin-left: 0;
    margin-top: auto;
}
.divChangeAvater{
    float: right;
    font-size: 13px;
}
</style>
