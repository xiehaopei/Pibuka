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
    redirect: '/monitor',
    children: [
      {
        path: '/monitor',
        component: () => import('../views/home/monitor.vue'),
      },
      {
        path: '/articles',
        component: () => import('../views/home/articles.vue'),
      },
      {
        path: '/publish',
        component: () => import('../views/home/publish.vue'),
      },
      {
        path: '/tags',
        component: () => import('../views/home/tags.vue'),
      },
      {
        path: '/comments',
        component: () => import('../views/home/comments'),
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
