import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getProblemList(page, pagesize, search) {
  console.log(search)
  return request({
    url: BASE_PATH + '/api/ojadmin/problem',
    method: 'get',
    params: { 'page': page - 1, 'pagesize': pagesize, 'search': search }
  })
}

export function insertProblem(problem) {
  return request({
    url: BASE_PATH + '/api/ojadmin/problem/insert',
    method: 'post',
    data: problem
  })
}

export function getEditProblem(pid) {
  return request({
    url: BASE_PATH + '/api/ojadmin/problem/' + pid,
    method: 'get'
  })
}

export function editProblem(problem, pid) {
  return request({
    url: BASE_PATH + '/api/ojadmin/problem/edit/' + pid,
    method: 'post',
    data: problem
  })
}

export function getContests(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/ojadmin/contest',
    method: 'get',
    params: { 'page': page - 1, 'pagesize': pagesize, 'search': search }
  })
}

