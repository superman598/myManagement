/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const personalRouter = {
  path: '/personal-management',
  component: Layout,
  redirect: '/personal-management/personal-list',
  name: 'personalManagement',
  meta: {
    title: '人员管理',
    icon: 'peoples'
  },
  children: [
    {
      path: ''
    //   component: () => import('@/views/personal-management/personal-list'),
    //   name: 'personalList',
    //   meta: { title: '人员列表' }
    },
    {
      path: 'personal-list',
      component: () => import('@/views/personal-management/personal-list'),
      name: 'personalList',
      meta: { title: '人员列表' }
    }
  ]
}

export default personalRouter
