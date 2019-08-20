import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/groups',
      name: 'grupy',
      component: () => import(/* webpackChunkName: "groups" */ './views/Groups.vue'),
    },
    {
      path: '/group/:id',
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
    {
      path: '/note/:id',
      name: 'notatka',
      component: () => import(/* webpackChunkName: "note" */ './views/Note.vue'),
    },
  ],
});
