import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('layouts/RegisterLayout.vue'),
    meta: {
      requiresAuth: false,
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      requiresAuth: false,
    }
  },
];


export default routes;
