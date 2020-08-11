import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getContests(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/contest',
    method: 'get',
    params: { page: page, pagesize: pagesize, search: search }
  })
}

export function getDetialContest(id) {
  return request({
    url: BASE_PATH + '/api/contest/problem/' + id,
    method: 'get'
  })
}
