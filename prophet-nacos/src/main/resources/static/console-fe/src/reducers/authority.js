/*
 * Copyright 1999-2018 Alibaba Group Holding Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Message} from '@alifd/next';
import request from '../utils/request';
import {PERMISSIONS_LIST, ROLE_LIST, USER_LIST} from '../constants';

const initialState = {
  users: {
    totalCount: 0,
    pageNumber: 1,
    pagesAvailable: 1,
    pageItems: [],
  },
  roles: {
    totalCount: 0,
    pageNumber: 1,
    pagesAvailable: 1,
    pageItems: [],
  },
  permissions: {
    totalCount: 0,
    pageNumber: 1,
    pagesAvailable: 1,
    pageItems: [],
  },
};

const successMsg = res => {
  if (res.code === 200) {
    Message.success(res.message);
  }
  return res;
};

/**
 * 用户列表
 * @param {*} params
 */
const getUsers = params => dispatch =>
  request.get('v1/auth/users', { params }).then(data => dispatch({ type: USER_LIST, data }));

/**
 * 创建用户
 * @param {*} param0
 */
const createUser = ([username, password]) =>
  request.post('v1/auth/users', { username, password }).then(res => successMsg(res));

/**
 * 删除用户
 * @param {*} username
 */
const deleteUser = username =>
  request.delete('v1/auth/users', { params: { username } }).then(res => successMsg(res));

/**
 * 重置密码
 * @param {*} param0
 */
const passwordReset = ([username, newPassword]) =>
  request.put('v1/auth/users', { username, newPassword }).then(res => successMsg(res));

/**
 * 角色列表
 * @param {*} params
 */

const getRoles = params => dispatch =>
  request.get('v1/auth/roles', { params }).then(data => dispatch({ type: ROLE_LIST, data }));

/**
 * 创建角色
 * @param {*} param0
 */
const createRole = ([role, username]) =>
  request.post('v1/auth/roles', { role, username }).then(res => successMsg(res));

/**
 * 删除角色
 * @param {*} param0
 */
const deleteRole = role =>
  request.delete('v1/auth/roles', { params: role }).then(res => successMsg(res));

/**
 * 权限列表
 * @param {*} params
 */
const getPermissions = params => dispatch =>
  request
    .get('v1/auth/permissions', { params })
    .then(data => dispatch({ type: PERMISSIONS_LIST, data }));

/**
 * 给角色添加权限
 * @param {*} param0
 */
const createPermission = ([role, resource, action]) =>
  request.post('v1/auth/permissions', { role, resource, action }).then(res => successMsg(res));

/**
 * 删除权限
 * @param {*} param0
 */
const deletePermission = permission =>
  request.delete('v1/auth/permissions', { params: permission }).then(res => successMsg(res));

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return { ...state, users: { ...action.data } };
    case ROLE_LIST:
      return { ...state, roles: { ...action.data } };
    case PERMISSIONS_LIST:
      return { ...state, permissions: { ...action.data } };
    default:
      return state;
  }
};

export {
  getUsers,
  createUser,
  deleteUser,
  passwordReset,
  getRoles,
  createRole,
  deleteRole,
  getPermissions,
  createPermission,
  deletePermission,
};
