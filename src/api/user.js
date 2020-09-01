import request from '@/utils/request'
import { BASE_PATH } from './config'

export function login(data) {
  return request({
    url: BASE_PATH + '/api/dmz/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: BASE_PATH + '/api/dmz/userinfo',
    method: 'post',
    data: { }
  })
}

export function logout() {
  return request({
    url: BASE_PATH + '/api/dmz/logout',
    method: 'post',
    data: { }
  })
}

export function register(username, password, email, name) {
  return request({
    url: BASE_PATH + '/api/dmz/register',
    method: 'post',
    data: { 'username': username, 'password': password, 'email': email, 'name': name }
  })
}

export function changeAvatar(imageUrl) {
  return request({
    url: BASE_PATH + '/api/user/avatar',
    method: 'post',
    data: { 'avatar': imageUrl }
  })
}

export function updateInfo(user) {
  return request({
    url: BASE_PATH + '/api/user/edit',
    method: 'post',
    data: { 'name': user.name, 'password': user.password, 'oldpassword': user.oldpassword, 'email': user.email, 'intro': user.intro }
  })
}
