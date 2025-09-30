import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import ProductsListView from '../views/ProductsListView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/products',
      name: 'products-list',
      component: ProductsListView,
      meta: { layout: 'DefaultLayout' },
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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { layout: 'AuthLayout' },
    },
  ],
})

export default router
