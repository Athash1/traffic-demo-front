import type { RouteRecordRaw } from 'vue-router'

const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: '/admin/',
    name: 'admin',
    component: () => import('@/layout/index.vue'),
    redirect: '/admin/accountManagement',
    children: [
      {
        path: '/admin/accountManagement',
        name: 'adminAccountManagement',
        component: () => import('@/views/admin/account/index.vue'),
        meta: { requiresAuth: true, roles: ['admin'], title: 'menus.accountManagement' },
      }, {
        path: '/admin/userManagement',
        name: 'adminUserManagement',
        component: () => import('@/views/admin/userManagement/index.vue'),
        meta: {
          title: 'menus.userManagement',
          icon: 'el-icon-more'
        }
      }, {
        path: '/admin/dashboard',
        name: 'adminDashboard',
        component: () => import('@/layout/parentLayout.vue'),
        children: [
          {
            path: '/admin/dashboard/totalAdd',
            name: 'adminTotalAdd',
            component: () => import('@/views/admin/dashboard/totalAdd.vue'),
            meta: { title: 'menus.totalAdd' }
          },
          {
            path: '/admin/dashboard/totalService',
            name: 'adminTotalService',
            component: () => import('@/views/admin/dashboard/totalService.vue'),
            meta: { title: 'menus.totalService' }
          },
          {
            path: '/admin/dashboard/monthAdd',
            name: 'adminMonthAdd',
            component: () => import('@/views/admin/dashboard/monthAdd.vue'),
            meta: { title: 'menus.monthAdd' }
          },
          {
            path: '/admin/dashboard/monthService',
            name: 'adminMonthService',
            component: () => import('@/views/admin/dashboard/monthService.vue'),
            meta: { title: 'menus.monthService' }
          },
          {
            path: '/admin/dashboard/gender',
            name: 'adminGender',
            component: () => import('@/views/admin/dashboard/totalGender.vue'),
            meta: { title: 'menus.totalGender' }
          }
        ]
      }
    ],
    meta: { requiresAuth: true, roles: ['admin'], title: 'menus.admin' },
  }
];

export default adminRoutes;