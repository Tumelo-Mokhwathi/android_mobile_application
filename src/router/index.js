import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import(/* webpackChunkName: "Landing" */ '@/views/Landing.vue'),
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "Admin" */ '@/views/Admin.vue'),
    meta: {
      isPublic: true,
    },
  },
  {
    component: () => import(/* webpackChunkName: "Details " */ '@/views/Details.vue'),
    name: 'Details',
    path: '/Users/:id/details',
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach((to, from, next) => {
  const isSignedIn = store.getters['usersStore/IsLoggedIn'];

  if (!to.meta.isPublic && !isSignedIn) {
    return next({ name: 'Landing' });
  }
  return next();
});

export default router;
