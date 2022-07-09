import Vue from 'vue';
import Vuex from 'vuex';
import  courseModule  from './courses/+store/course-state';
import  authModule  from './auth/+store/auth-state';
import userModule from './user/+store/user-state';
import snackbarState from './shared/+store/snackbar-state';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    courseModule,
    authModule,
    userModule,
    snackbarState
  }
});