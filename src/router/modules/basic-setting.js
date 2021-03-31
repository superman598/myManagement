
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingRouter = {
  path: '/basic-setting',
  component: Layout,
  redirect: '/basic-setting/taskType',
  name: 'basicSetting',
  meta: {
    title: '基础设置',
    icon: 'edit'
  },
  children: [
    {
      path: 'projectType',
      component: () => import('@/views/basic-setting/projectType'),
      name: 'projectType',
      meta: { title: '项目类型' }
    },
    {
      path: 'positionType',
      component: () => import('@/views/basic-setting/positionType'),
      name: 'positionType',
      meta: { title: '职位类型' }
    }
  ]
}

export default settingRouter
