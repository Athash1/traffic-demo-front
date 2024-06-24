import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useAuthStore} from '@/stores/modules/authStore'
import adminRoutes from '@/router/admin/admin'
import userRoutes from '@/router/user/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/admin/login'
    },
    {
      path: '/admin/login',
      name: 'adminLogin',
      component: () => import('@/views/login/adminLogin.vue')
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: () => import('@/views/login/userLogin.vue'),
    },
    ...adminRoutes,
    ...userRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      redirect: '/admin/login'
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const role = authStore.role;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return { name : 'root'}
    } else {
      if (typeof to.meta.roles === 'undefined') {
        return true;
      } else if (to.meta.roles.includes(typeof role === 'string' ? role : 'noRole')) {
        return true;
      } else {
        return { name: 'root'}
      }
    }
  } else {
    return true;
  }
})

export default router
