import AppLogin from './components/Login';
import AppRegister from './components/Register';
import { innerGuard } from '../utils/guards';
import AppAuth from './Auth.vue';
export default [
  {
    path: '/auth',
    component: AppAuth,
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: AppLogin
      },
      {
        path: 'register',
        name: 'register',
        component: AppRegister
      }
    ],
    beforeEnter: innerGuard
  }
];
