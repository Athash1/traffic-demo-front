import type {RouteRecordRaw} from 'vue-router'

const  userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user/',
    name: 'user',
    component: () => import('@/layout/userLayout.vue'),
    redirect: '/user/railway',
    children: [
      {
        path: '/user/railway',
        name: 'userRailway',
        component: () => import('@/views/user/railway/index.vue'),
        meta: { requiresAuth: true, roles: ['user'], title: 'menus.railway' },
      },
    ]
  },
]

export default userRoutes;