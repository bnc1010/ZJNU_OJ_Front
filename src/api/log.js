import request from '@/utils/request'
import { BASE_PATH } from '@/api/config'

export function getCommonLog(page, pagesize, ip, url, startTime, endTime, userId) {
  return request({
    url: BASE_PATH + '/api/system/commonlog',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize, ip: ip, url: url, startTime: startTime, endTime: endTime, userId: userId }
  })
}

export function getAdminLog(page, pagesize, ip, url, startTime, endTime, userId) {
  return request({
    url: BASE_PATH + '/api/system/adminlog',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize, ip: ip, url: url, startTime: startTime, endTime: endTime, userId: userId }
  })
}

