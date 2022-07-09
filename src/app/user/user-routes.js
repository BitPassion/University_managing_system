import AppUser from './User.vue';
export default [
  {
    path: '/user',
    component: AppUser,
    children: [
      {
        path: '',
        redirect: { name: 'profile' }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () =>
          import(
            /* webpackChunkName: "user-profile" */ '../user/components/Profile.vue'
          )
      }
    ],
    meta: { auth: true }
  }
];
