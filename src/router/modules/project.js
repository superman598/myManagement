/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// const nestedRouter = {
//   path: '/nested',
//   component: Layout,
//   redirect: '/nested/menu1/menu1-1',
//   name: 'Nested',
//   meta: {
//     title: 'nested',
//     icon: 'nested'
//   },
//   children: [
//     {
//       path: 'menu1',
//       component: () => import('@/views/nested/menu1/index'), // Parent router-view
//       name: 'Menu1',
//       meta: { title: 'menu1' },
//       redirect: '/nested/menu1/menu1-1',
//       children: [
//         {
//           path: 'menu1-1',
//           component: () => import('@/views/nested/menu1/menu1-1'),
//           name: 'Menu1-1',
//           meta: { title: 'menu1-1' }
//         },
//         {
//           path: 'menu1-2',
//           component: () => import('@/views/nested/menu1/menu1-2'),
//           name: 'Menu1-2',
//           redirect: '/nested/menu1/menu1-2/menu1-2-1',
//           meta: { title: 'menu1-2' },
//           children: [
//             {
//               path: 'menu1-2-1',
//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
//               name: 'Menu1-2-1',
//               meta: { title: 'menu1-2-1' }
//             },
//             {
//               path: 'menu1-2-2',
//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
//               name: 'Menu1-2-2',
//               meta: { title: 'menu1-2-2' }
//             }
//           ]
//         },
//         {
//           path: 'menu1-3',
//           component: () => import('@/views/nested/menu1/menu1-3'),
//           name: 'Menu1-3',
//           meta: { title: 'menu1-3' }
//         }
//       ]
//     },
//     {
//       path: 'menu2',
//       name: 'Menu2',
//       component: () => import('@/views/nested/menu2/index'),
//       meta: { title: 'menu2' }
//     }
//   ]
// }
const projectRouter = {
  path: '/project-management',
  component: Layout,
  redirect: '/project-management/cooperation',
  name: 'projectManagement',
  meta: {
    title: '项目管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'cooperation',
      component: () => import('@/views/project-management/cooperation'),
      name: 'cooperation',
      meta: { title: '合作项目列表' }
    },
    {
      path: 'self-operated',
      component: () => import('@/views/project-management/self-operated'),
      name: 'self',
      meta: { title: '自营项目列表' }
    },
    {
      path: 'affiliated',
      component: () => import('@/views/project-management/affiliated'),
      name: 'affiliated',
      meta: { title: '挂靠项目列表' }
    }
  ]
}

export default projectRouter
