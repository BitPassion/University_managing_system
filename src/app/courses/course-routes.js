// import { authGuard } from '../utils/guards';
import AppCourse from './Course.vue';
export default [
  {
    path: '/course',
    component: AppCourse,
    children: [
      {
        path: '',
        redirect: { name: 'course-list' }
      },
      {
        path: 'list',
        name: 'course-list',
        component: () =>
          import(
            /* webpackChunkName: "course-list" */ '../courses/components/List.vue'
          )
      },
      {
        path: 'create',
        name: 'create-course',
        component: () =>
          import(
            /* webpackChunkName: "course-create" */ '../courses/components/Create.vue'
          )
      },
      {
        path: ':id',
        name: 'course-detail',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "course-detail" */ '../courses/components/Detail.vue'
          )
      }
    ],
    // beforeEnter: authGuard,
    meta: { auth: true }
  }
];
