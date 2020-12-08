import { BASE_PATH } from '@/api/config'
import request from '@/utils/request'

export function getStudentGroup(page, pagesize) {
  return request({
    url: BASE_PATH + '/api/teacher/studentGroup',
    method: 'post',
    data: { page: page - 1, pagesize: pagesize }
  })
}

export function getProblemSet(page, pagesize, search) {
  return request({
    url: BASE_PATH + '/api/teacher/problemSet',
    method: 'get',
    params: { page: page - 1, pagesize: pagesize, search: search }
  })
}

export function addProblemSet(problemSet) {
  return request({
    url: BASE_PATH + '/api/teacher/problemset/insert',
    method: 'post',
    data: problemSet
  })
}

export function updateProblemSet(problemSet) {
  return request({
    url: BASE_PATH + '/api/teacher/problemset/update/' + problemSet.id,
    method: 'post',
    data: problemSet
  })
}

