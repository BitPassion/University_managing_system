import Vue from 'vue';
import VueRouter from 'vue-router';
import { authRoutes } from './auth';
import { courseRoutes } from './courses';
import { AppWelcome } from './core/components';
import { userRoutes } from './user';
import { globalAuthGuard } from './utils/guards';
Vue.use(VueRouter);

const appRoutes = [
  {
    path: '/',
    name: 'home',
    component: AppWelcome
  },
  {
    path: '*',
    name: 'not-found',
    component: () =>
      import(
        /* webpackChunkName: "not-found" */ './core/components/NotFound.vue'
      )
  }
];

const routes = [...appRoutes, ...authRoutes, ...courseRoutes, ...userRoutes];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(globalAuthGuard);

export default router;
