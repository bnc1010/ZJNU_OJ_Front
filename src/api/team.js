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

export function updateTeamAttend(teamId, attend) {
  return request({
    url: BASE_PATH + '/api/team/update/attend/' + teamId,
    method: 'get',
    params: { 'attend': attend }
  })
}

export function getInviteCode(teamId) {
  return request({
    url: BASE_PATH + '/api/team/invite/' + teamId,
    method: 'get'
  })
}

export function joinTeamByCode(inviteCode) {
  return request({
    url: BASE_PATH + '/api/team/invite/' + inviteCode,
    method: 'get'
  })
}

export function applyTeam(teamId) {
  return request({
    url: BASE_PATH + '/api/team/apply/' + teamId,
    method: 'post'
  })
}

export function moveoutTeammate(teammateId) {
  return request({
    url: BASE_PATH + '/api/team/delete/teammate/' + teammateId,
    method: 'delete'
  })
}

export function showapply(teamId) {
  return request({
    url: BASE_PATH + '/api/team/showapply/' + teamId,
    method: 'get'
  })
}

export function agreeApply(applyId) {
  return request({
    url: BASE_PATH + '/api/team/apply/approve/' + applyId,
    method: 'post'
  })
}

export function disagreeApply(applyId) {
  return request({
    url: BASE_PATH + '/api/team/apply/reject/' + applyId,
    method: 'post'
  })
}

export function batchInvite(teamId, username) {
  return request({
    url: BASE_PATH + '/api/team/batch/' + teamId,
    method: 'get',
    params: { username: username }
  })
}
