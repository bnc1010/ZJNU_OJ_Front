<template>
  <div class="upload-container">
    <el-upload
      :multiple="true"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      :action="uploadUrl"
      :headers="{'Access-Token' : token}"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">图片应小于10MB</div>
    </el-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadImage, getUploadUrl } from '@/api/image'
import { BASE_PATH } from '@/api/config'
import { getToken } from '@/utils/auth'

export default {
  name: 'SingleImageUpload',
  data() {
    return {
      tempUrl: '',
    }
  },
  computed: {
    imageUrl() {
      return this.tempUrl
    },
    token() {
      return getToken()
    },
    uploadUrl() {
      return getUploadUrl()
    }
  },
  methods: {
    rmImage() {
      this.tempUrl=''
      this.emitInput('')
    },
    /*
    回传图片地址给父组件
    */
    emitInput(val) {
      this.$emit('imageUrlCallback', val)
    },
    handleImageSuccess(res) {
      this.tempUrl = BASE_PATH + res.data
      console.log(res)
      this.emitInput(this.tempUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 40%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>
