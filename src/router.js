import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '/groups',
      name: 'grupy',
      component: () => import(/* webpackChunkName: "groups" */ './views/Groups.vue'),
    },
    {
      path: '/group',
      name: 'grupa',
      component: () => import(/* webpackChunkName: "singleGroup" */ './views/SingleGroup.vue'),
    },
    {
      path: '/settings',
      name: 'ustawienia',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    },
    {
      path: '/user',
      name: 'użytkownik',
      component: () => import(/* webpackChunkName: "user" */ './views/User.vue'),
    },
  ],
});
