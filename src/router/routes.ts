import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },

  {
    path: '/login',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
    ],
  },
  {
    path: '/prom',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/prom.vue') },
    ],
  },
  {
    path: '/patfile',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/patFile.vue') },
    ],
  },
  {
    path: '/search',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/patSearch.vue') },
    ],
  },
  {
    path: '/ende',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/finalPage.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
