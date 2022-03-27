import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Admin',
      password: '123456',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      realName: 'test user',
      password: '123456',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/mine/data',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ]
}

export default [
  {
    url: '/basic-api/login',
    method: 'post',
    response: (request: requestParams) => {
      const { username, password } = request.body
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      )
      if (!checkUser) {
        return resultError('Incorrect account or password！')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!')
      }
      return resultSuccess(checkUser)
    },
  },
  {
    url: '/basic-api/logout',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const checkUser = createFakeUserList().find((item) => item.token === token)
      if (!checkUser) {
        return resultError('Invalid token!')
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    },
  },
] as MockMethod[]
