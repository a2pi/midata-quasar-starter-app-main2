import { openURL } from 'quasar';
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
      { path: '', component: () => import('pages/Prom.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => openURL('http://localhost:8080/#/login') },

    ],
  },
  {
    path: '/patfile',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PatFile.vue') },
    ],
  },
  {
    path: '/search',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PatSearch.vue') },
    ],
  },
  {
    path: '/ende',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FinalPage.vue') },
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
