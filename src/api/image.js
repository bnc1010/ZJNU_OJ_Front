import { BASE_PATH } from './config'
import request from '@/utils/request'

export function uploadImage(image) {
  var formdata = new FormData()
  formdata.append('file', image)
  return request({
    url: BASE_PATH + '/api/media/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formdata
  })
}

export function getUploadUrl() {
  return BASE_PATH + '/api/media/upload'
}
