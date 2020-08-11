import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getNotice(data) {
  return request({
    url: BASE_PATH + '/api/notice',
    method: 'get',
    data
  })
}
