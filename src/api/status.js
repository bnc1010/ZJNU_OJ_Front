import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getStatus(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/status',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize }
  })
}
