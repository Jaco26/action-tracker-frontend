import Vue from 'vue'
import Router from 'vue-router'

import { store } from '@/store/store';

import Home from './views/Home.vue'
import Login from './views/Login';
import Reports from './views/Reports';
import AccessDenied from './views/AccessDenied';
import NotFound from './views/NotFound';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        requiresAuth: true,
      },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,  
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/access-denied',
      name: 'access-denied',
      component: AccessDenied,
    },
    {
      path: '*',
      component: NotFound,
    }

  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.state.auth.accessToken && store.getters['auth/isAuthenticated']()) {
      next();
    } else {
      store.dispatch('auth/logout');
    }
  } else {
    next();
  }
});

export default router


