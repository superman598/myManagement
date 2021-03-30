
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const financialRouter = {
  path: '/financial-management',
  component: Layout,
  redirect: '/financial-management/financial-list',
  name: 'financialManagement',
  meta: {
    title: '项目财务管理',
    icon: 'money'
  },
  children: [
    {
      path: ''
    //   component: () => import('@/views/personal-management/personal-list'),
    //   name: 'personalList',
    //   meta: { title: '人员列表' }
    },
    {
      path: 'financial-list',
      component: () => import('@/views/financial-management/financial-list'),
      name: 'financialList',
      meta: { title: '项目财务列表' }
    }
  ]
}

export default financialRouter
