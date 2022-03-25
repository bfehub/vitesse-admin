import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, requestParams } from '../_util'

export default [
  {
    url: '/basic-api/success',
    method: 'get',
    response: (request: requestParams) => {
      return resultSuccess([])
    },
  },
  {
    url: '/basic-api/cancel',
    method: 'get',
    response: (request: requestParams) => {
      return resultSuccess([])
    },
  },
  {
    url: '/basic-api/error',
    method: 'get',
    response: (request: requestParams) => {
      return resultError('由于什么原因失败了？？?')
    },
  },
] as MockMethod[]
