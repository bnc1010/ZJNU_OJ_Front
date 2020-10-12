import request from '@/utils/request'
import { BASE_PATH } from '@/api/config'

export function getTagList() {
  return request({
    url: BASE_PATH + '/api/ojadmin/tag',
    method: 'get'
  })
}

export function addTag(tag) {
  return request({
    url: BASE_PATH + '/api/ojadmin/tag/add',
    method: 'post',
    data: tag
  })
}

export function editTag(tag) {
  return request({
    url: BASE_PATH + '/api/ojadmin/tag/edit/' + tag.id,
    method: 'post',
    data: tag
  })
}
