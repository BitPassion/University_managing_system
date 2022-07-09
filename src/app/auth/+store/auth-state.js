import { toastSuccess, toastError } from '@/plugins/toasted';
import { http } from '../../services/httpClient';
import { updateUserInfo } from '../../user/+store/user-state';
const initialState = {
  isAuth: localStorage.getItem('authtoken') !== null,
  authtoken: localStorage.getItem('authtoken'),
  isLoading: false,
};

export const actionTypes = {
  login: 'auth/LOGIN SUCCESS',
  register: 'auth/REGISTER SUCCESS',
  logout: 'auth/LOGOUT SUCCESS',
};

export const { login, logout, register } = actionTypes;

const getters = {
  authtoken: (state) => state.authtoken,
  isAuth: (state) => state.isAuth,
  isLoading: (state) => state.isLoading,
};

const actions = {
  async [login]({ commit, dispatch }, payload) {
    try {
      commit('isLoading');
      const { username, password } = payload;
      const { data } = await http.post('login', { username, password });
      localStorage.setItem('authtoken', data._kmd.authtoken);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(`userModule/${updateUserInfo}`);
      toastSuccess('Successfully Logged!');
      commit(login, {
        userInfo: data,
        authtoken: data._kmd.authtoken,
        isAuth: true,
      });
      commit('isLoading');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
  [logout]({ commit }) {
    localStorage.clear();
    toastSuccess('Successfully Logout!');
    commit(logout);
  },
  async [register]({ commit }, payload) {
    try {
      commit('isLoading');
      await http.post('', payload);
      toastSuccess('Successfully Registered!');
      commit('isLoading');
    } catch (err) {
      toastError(`Something went wrong! ${err}`);
    }
  },
};

const mutations = {
  [login](state, payload) {
    Object.assign(state, payload);
  },
  [logout](state) {
    Object.assign(state, { isAuth: false, authtoken: null, userInfo: null });
  },
  isLoading(state) {
    Object.assign(state, { isLoading: !state.isLoading });
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
