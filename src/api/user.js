import request from '@/utils/request'
import { BASE_PATH } from './config'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    url: BASE_PATH + '/api/dmz/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: BASE_PATH + '/api/dmz/userinfo',
    method: 'post',
    data: { 'token': token }
  })
}

export function logout() {
  return request({
    url: BASE_PATH + '/api/dmz/logout',
    method: 'post',
    data: { 'token': getToken() }
  })
}
