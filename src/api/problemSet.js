import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getProblemSetList(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/problems/problemset',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize, search: search }
  })
}

export function getProblemSetById(id) {
  return request({
    url: BASE_PATH + '/api/problems/problemset/' + id,
    method: 'get'
  })
}

export function getAllProblemSet(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/ojadmin/problemset',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize, search: search }
  })
}

export function addProblemSet(problemSet) {
  return request({
    url: BASE_PATH + '/api/ojadmin/problemset/insert',
    method: 'post',
    data: problemSet
  })
}

export function updateProblemSet(problemSet) {
  return request({
    url: BASE_PATH + '/api/ojadmin/problemset/update/' + problemSet.id,
    method: 'post',
    data: problemSet
  })
}
