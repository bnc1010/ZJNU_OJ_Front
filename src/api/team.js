import request from '@/utils/request'
import { BASE_PATH } from '@/api/config'

export function getTeamById(id) {
  return request({
    url: BASE_PATH + '/api/team/' + id,
    method: 'get'
  })
}

export function getMyTeams(page, pagesize) {
  return request({
    url: BASE_PATH + '/api/team/myteams',
    method: 'get',
    params: { 'page': page - 1, 'pagesize': pagesize }
  })
}

export function getTeams(page, pagesize) {
  return request({
    url: BASE_PATH + '/api/team',
    method: 'get',
    params: { 'page': page - 1, 'pagesize': pagesize }
  })
}

export function createTeam(team) {
  return request({
    url: BASE_PATH + '/api/team/create',
    method: 'post',
    data: team
  })
}
