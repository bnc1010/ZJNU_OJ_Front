import request from '@/utils/request'
import { BASE_PATH } from './config'

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
    params: { }
  })
}

export function submitCode(id, language, share, source) {
  return request({
    url: BASE_PATH + '/api/problems/submit/' + id,
    method: 'post',
    data: { language: language, share: share, source: source }
  })
}

export function getStatusBySubmitId(id) {
  return request({
    url: BASE_PATH + '/api/status/view/' + id,
    method: 'get',
    params: { }
  })
}

export function setStatuShareBySubmitId(id) {
  return request({
    url: BASE_PATH + '/api/status/share/' + id,
    method: 'post',
    data: { }
  })
}

export function getProblemName(id) {
  return request({
    url: BASE_PATH + '/api/problems/name/' + id,
    method: 'get'
  })
}

export function getAnalysis(pid) {
  return request({
    url: BASE_PATH + '/api/problems/analysis/' + pid,
    method: 'get'
  })
}

export function addAnalysis(pid, analysis) {
  return request({
    url: BASE_PATH + '/api/problems/analysis/post/' + pid,
    method: 'post',
    data: { text: analysis }
  })
}

export function getAnalysisById(id) {
  return request({
    url: BASE_PATH + '/api/problems/analysis/get/' + id,
    method: 'get'
  })
}

export function getEditAnalysis(id) {
  return request({
    url: BASE_PATH + '/api/problems/analysis/edit/' + id,
    method: 'get'
  })
}

export function editAnalysis(id, analysis) {
  return request({
    url: BASE_PATH + '/api/problems/analysis/edit/' + id,
    method: 'post',
    data: { text: analysis }
  })
}
