import request from '@/utils/request'
import { BASE_PATH } from './config'
import { getToken } from '@/utils/auth'

export function getProblemById(id) {
  return request({
    url: BASE_PATH + '/api/problems/' + id,
    method: 'get'
  })
}

export function getProblems(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/problems',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize, search: search }
  })
}

export function getTags() {
  return request({
    url: BASE_PATH + '/api/problems/tags',
    method: 'get'
  })
}

export function getLastSubmits(id) {
  return request({
    url: BASE_PATH + '/api/status/user/latest/submit/' + id,
    method: 'get',
    params: { 'token': getToken() }
  })
}

export function submitCode(id, language, share, source) {
  return request({
    url: BASE_PATH + '/api/problems/submit/' + id,
    method: 'post',
    data: { language: language, share: share, source: source, token: getToken() }
  })
}

export function getStatusBySubmitId(id) {
  return request({
    url: BASE_PATH + '/api/status/view/' + id,
    method: 'get',
    params: { 'token': getToken() }
  })
}

export function setStatuShareBySubmitId(id) {
  return request({
    url: BASE_PATH + '/api/status/share/' + id,
    method: 'post',
    data: { 'token': getToken() }
  })
}
