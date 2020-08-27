import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/home',
    component: () => import('../views/home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('../views/home/welcome.vue'),
      },
      {
        path: '/data-analyze',
        component: () => import('../views/home/data-analyze.vue'),
      },
      {
        path: '/article-management',
        component: () => import('../views/home/article-management.vue'),
      },
      {
        path: '/tag-management',
        component: () => import('../views/home/tag-management.vue'),
      },
      {
        path: '/article-publish',
        component: () => import('../views/home/article-publish.vue'),
      },
      {
        path: '/personal',
        component: () => import('../views/home/personal.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.localStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});

export default router;
