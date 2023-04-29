import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'Contact',path: '', component: () => import('pages/IndexPage.vue') }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginPage.vue'),
    // children: [{ path: '', component: () => import('pages/TempList.vue') }],
    meta: { requiresAuth: false },
  },
  // {
  //   path: '/contacts2',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/ContactList.vue') }],
  // },
  {
    path: '/contacts/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Detail', path: '', component: () => import('src/pages/ContactDetailPage.vue') },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
