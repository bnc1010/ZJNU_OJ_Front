import request from '@/utils/request'
import {BASE_PATH} from './config'

export function getProblemById(id) {
  return request({
    url: BASE_PATH +'/api/problem/' + id,
    method: 'get'
  })
}

export function getProblems(page, pagesize, search) {
  return request({
    url: BASE_PATH +'/api/problems',
    method: 'get',
    params:{page:page, pagesize:pagesize, search:search}
  })
}

export function getTags() {
  return request({
    url: BASE_PATH +'/api/problems/tags',
    method: 'get',
  })
}

export function getLastSubmits(id) {
  return request({
    url: BASE_PATH +'/api/status/user/latest/submit/' + id,
    method: 'get'
  })
}

export function submitCode(id, lang, share, source){
  return request({
    url: BASE_PATH +'/api/problem/submit/' + id,
    method: 'post',
    params:{lang:lang, share:share, source:source}
  })
}

export function getStatusBySubmitId(id) {
  return request({
    url: BASE_PATH +'/api/status/view/' + id,
    method: 'post',
  })
}

export function setStatuShareBySubmitId(id) {
  return request({
    url: BASE_PATH + '/api/status/share/' + id,
    method: 'post',
  })
}