import request from '@/utils/request'
import { BASE_PATH } from './config'
import { getToken } from '@/utils/auth'

export function getContests(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/contest',
    method: 'get',
    params: { 'page': page - 1, 'pagesize': pagesize, 'search': search }
  })
}

export function getDetialContest(id) {
  return request({
    url: BASE_PATH + '/api/contest/problem/' + id,
    method: 'get'
  })
}

export function checkGate(id) {
  return request({
    url: BASE_PATH + '/api/contest/gate/' + id,
    method: 'get',
    params: { 'token': getToken() }
  })
}

export function creatContest(contest) {
  return request({
    url: BASE_PATH + '/api/contest/create',
    method: 'post',
    data: { 'title': contest.title, 'description': contest.description, 'privilege': contest.privilege, 'password': contest.password, 'startTime': contest.startTime, 'length': contest.length, 'tid': contest.tid, 'problems': contest.problems, 'token': getToken() }
  })
}

export function getContestInfo(id) {
  return request({
    url: BASE_PATH + '/api/contest/background/' + id,
    method: 'get',
    params: { 'token': getToken() }
  })
}

export function updateContestInfo(id) {
  return request({
    url: BASE_PATH + '/api/contest/background/' + id,
    method: 'get',
    params: { 'token': getToken() }
  })
}

export function updateContest(contest, id) {
  return request({
    url: BASE_PATH + '/api/contest/background/' + id,
    method: 'post',
    data: { 'title': contest.title, 'description': contest.description, 'privilege': contest.privilege, 'password': contest.password, 'startTime': contest.startTime, 'length': contest.length, 'tid': contest.tid, 'problems': contest.problems, 'token': getToken() }
  })
}

export function contestGate(id) {
  return request({
    url: BASE_PATH + '/api/contest/gate/' + id,
    method: 'get',
    params: { 'token': getToken() }
  })
}
