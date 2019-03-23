import Vue from 'vue'
import Router from 'vue-router'

import { store } from '@/store/store';

import Home from './views/Home.vue'
import Login from './views/Login';

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
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.state.auth.accessToken && store.getters['auth/isAuthenticated']()) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router


