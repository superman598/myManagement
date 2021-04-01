const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10,20)',
      author: '张三'
    }
  ]
})
module.exports = [
  {
    url: '/vue-element-admin/test',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
