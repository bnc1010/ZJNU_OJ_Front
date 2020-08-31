import { BASE_PATH } from './config'
import { request } from '@/utils/request'

export function uploadImage(image) {
  return request({
    url: BASE_PATH + '/api/media/upload',
    method: 'post',
    data: { 'image-file': image }
  })
}

export function getUploadUrl() {
  return BASE_PATH + '/api/media/upload'
}
