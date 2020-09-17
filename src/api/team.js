import request from '@/utils/request'
import { BASE_PATH } from '@/api/config'

export function getMyTeams(page, pagesize) {
  return request({
    url: BASE_PATH + '/api/team/myteams',
    method: 'get',
    params: { 'page': page, 'pagesize': pagesize }
  })
}

export function getTeams(page, pagesize) {
  return request({
    url: BASE_PATH + '/api/team',
    method: 'get',
    params: { 'page': page, 'pagesize': pagesize }
  })
}
