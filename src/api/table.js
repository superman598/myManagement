import request from '@/utils/request'

export function getTest(params) {
  return request({
    url: '/vue-element-admin/test',
    method: 'get',
    params
  })
}
