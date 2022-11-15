import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/DigitalPromLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },
  {
    path: '/overview',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Overview.vue') }],
  },
  {
    path: '/developmentBasics',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/development/DevelopmentBasics.vue') },
    ],
  },
  {
    path: '/quasar',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/development/Quasar.vue') }],
  },
  {
    path: '/github',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/development/Github.vue') }],
  },
  {
    path: '/midata/introduction',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataIntroduction.vue'),
      },
    ],
  },
  {
    path: '/midata/myFirstApp',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataMyFirstApp.vue'),
      },
    ],
  },
  {
    path: '/midata/demo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/midata/MidataDemo.vue') },
    ],
  },
  {
    path: '/internationalization',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/development/Internationalization.vue') },
    ],
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
