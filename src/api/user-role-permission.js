import request from '@/utils/request'
import { BASE_PATH } from './config'

export function getUserList(pageNum, pageSize) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/all',
    method: 'post',
    data: { 'pageNum': pageNum, 'pageSize': pageSize }
  })
}

export function getRoleList() {
  return request({
    url: BASE_PATH + '/api/usermanager/role/all',
    method: 'post',
    data: {}
  })
}

export function getPermissionList() {
  return request({
    url: BASE_PATH + '/api/system/permission/all',
    method: 'post',
    data: {}
  })
}

export function getPermissionByRId(rId) {
  return request({
    url: BASE_PATH + '/api/system/permission/get',
    method: 'post',
    data: { 'id': rId }
  })
}

export function addRole(rName, rType, rLevel) {
  return request({
    url: BASE_PATH + '/api/usermanager/role/add',
    method: 'post',
    data: { 'name': rName, 'type': rType, 'level': rLevel }
  })
}

export function deleteRole(rId) {
  return request({
    url: BASE_PATH + '/api/usermanager/role/delete',
    method: 'post',
    data: { 'id': rId }
  })
}

export function grantPermissionToRole(rId, pIds) {
  return request({
    url: BASE_PATH + '/api/usermanager/role/grant',
    method: 'post',
    data: { 'id': rId, 'pids': pIds }
  })
}

export function dropPermissionFromRole(rId, pIds) {
  return request({
    url: BASE_PATH + '/api/usermanager/role/drop',
    method: 'post',
    data: { 'id': rId, 'pids': pIds }
  })
}

export function grantRoleToUser(uId, rIds) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/grant',
    method: 'post',
    data: { 'id': uId, 'roleIds': rIds }
  })
}

export function dropRoleFromUser(uId, rIds) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/drop',
    method: 'post',
    data: { 'id': uId, 'roleIds': rIds }
  })
}

export function addUser(user) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/add',
    method: 'post',
    data: user
  })
}

export function removeUser(uIds) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/delete',
    method: 'post',
    data: { 'uids': uIds }
  })
}

export function updateUser(user) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/update',
    method: 'post',
    data: user
  })
}

export function resetUser(uId) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/reset',
    method: 'post',
    data: { 'id': uId }
  })
}

export function getUserRole(uId) {
  return request({
    url: BASE_PATH + '/api/usermanager/user/roles',
    method: 'post',
    data: { 'id': uId }
  })
}

export function addPermission(permission) {
  return request({
    url: BASE_PATH + '/api/system/permission/add',
    method: 'post',
    data: permission
  })
}

export function deletePermission(pId) {
  return request({
    url: BASE_PATH + '/api/system/permission/delete',
    method: 'post',
    data: { 'id': pId }
  })
}

export function editPermission(permission) {
  return request({
    url: BASE_PATH + '/api/system/permission/update',
    method: 'post',
    data: permission
  })
}

