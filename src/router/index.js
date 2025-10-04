import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import ProductsListView from '../views/ProductsListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAuthStore } from '@/stores/authStore'
import LandingPageView from '@/views/LandingPageView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageView,
      meta: { layout: 'LandingLayout' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: 'DefaultLayout', requiresAuth: true },
    },
    {
      path: '/products',
      name: 'products-list',
      component: ProductsListView,
      meta: { layout: 'DefaultLayout', requiresAuth: true },
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: ProductDetailView,
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { layout: 'AuthLayout' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Pastikan store diinisialisasi di dalam guard
  const authStore = useAuthStore()

  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = authStore.isAuthenticated

  // Jika rute butuh login dan user belum login
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  }
  // Jika user sudah login dan mencoba akses halaman login
  else if (to.name === 'login' && isAuthenticated) {
    next('/')
  }
  // Jika semua aman
  else {
    next()
  }
})

export default router
