import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getConfig() {
  return request({
    url: BASE_PATH + '/api/ojadmin/config',
    method: 'get'
  })
}

export function updateConfig(configs) {
  return request({
    url: BASE_PATH + '/api/ojadmin/config',
    method: 'post',
    data: configs
  })
}
