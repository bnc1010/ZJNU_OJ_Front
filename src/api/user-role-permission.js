import { getToken } from '@/utils/auth'
import request from '@/utils/request'
import {BASE_PATH} from './config'

export function getUserList(pageNum, pageSize) {
    return request({
        url: BASE_PATH + '/users/all',
        method: 'post',
        data: { 'pageNum': pageNum, 'pageSize': pageSize }
    })
}

export function getRoleList() {
    return request({
        url: BASE_PATH + '/system/role/all',
        method: 'post',
        data: { 'token': getToken() }
    })
}

export function getPermissionList() {
    return request({
        url: BASE_PATH + '/system/permission/all',
        method: 'post',
        data: { 'token': getToken() }
    })
}

export function getPermissionByRId(rId) {
    return request({
        url: BASE_PATH + '/system/permission/get',
        method: 'post',
        data: { 'token': getToken(), 'rId': rId }
    })
}

export function addRole(rName, rType, rRank) {
    return request({
        url: BASE_PATH + '/system/role/add',
        method: 'post',
        data: { 'token': getToken(), 'roleName': rName, 'rType': rType, 'rRank': rRank }
    })
}

export function deleteRole(rId) {
    return request({
        url: BASE_PATH + '/system/role/delete',
        method: 'post',
        data: { 'token': getToken(), 'rId': rId }
    })
}

export function grantPermissionToRole(rId, pIds) {
    return request({
        url: BASE_PATH + '/system/role/grant',
        method: 'post',
        data: { 'token': getToken(), 'rId': rId, 'pIds': pIds }
    })
}

export function dropPermissionFromRole(rId, pIds) {
    return request({
        url: BASE_PATH + '/system/role/drop',
        method: 'post',
        data: { 'token': getToken(), 'rId': rId, 'pIds': pIds }
    })
}

export function grantRoleToUser(uId, rIds) {
    return request({
        url: BASE_PATH + '/users/grant',
        method: 'post',
        data: { 'token': getToken(), 'uId': uId, 'rIds': rIds }
    })
}

export function dropRoleFromUser(uId, rIds) {
    return request({
        url: BASE_PATH + '/users/drop',
        method: 'post',
        data: { 'token': getToken(), 'uId': uId, 'rIds': rIds }
    })
}

export function addUser(user) {
    return request({
        url: BASE_PATH + '/users/add',
        method: 'post',
        data: user
    })
}

export function removeUser(uIds) {
    return request({
        url: BASE_PATH + '/users/delete',
        method: 'post',
        data: { 'uIds': uIds, 'token': getToken() }
    })
}

export function updateUser(user) {
    return request({
        url: BASE_PATH + '/users/update',
        method: 'post',
        data: JSON.parse((JSON.stringify(user) + JSON.stringify({ 'token': getToken() })).replace(/}{/, ','))
    })
}

export function resetUser(uId) {
    return request({
        url: BASE_PATH + '/users/reset',
        method: 'post',
        data: { 'uId': uId, 'token': getToken() }
    })
}

export function getUserRole(uId) {
    return request({
        url: BASE_PATH + '/users/roles',
        method: 'post',
        data: { 'uId': uId, 'token': getToken() }
    })
}

export function addPermission(permission) {
    return request({
        url: BASE_PATH + '/system/permission/add',
        method: 'post',
        data: JSON.parse((JSON.stringify(permission) + JSON.stringify({ 'token': getToken() })).replace(/}{/, ','))
    })
}

export function deletePermission(pId) {
    return request({
        url: BASE_PATH + '/system/permission/delete',
        method: 'post',
        data: { 'pId': pId }
    })
}

export function editPermission(permission) {
    return request({
        url: BASE_PATH + '/system/permission/update',
        method: 'post',
        data: JSON.parse((JSON.stringify(permission) + JSON.stringify({ 'token': getToken() })).replace(/}{/, ','))
    })
}

