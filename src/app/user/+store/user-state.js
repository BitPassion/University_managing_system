import { toastSuccess } from '@/plugins/toasted';
import { http } from '../../services/httpClient';
const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')),
  userCourses: [],
};

export const actionTypes = {
  updateUserInfo: 'UPDATE USER INFO',
  getUserCourses: 'GET COURSES FOR CURRENT USER',
};

export const { updateUserInfo, getUserCourses } = actionTypes;

const getters = {
  userInfo: (state) => state.userInfo,
  userCourses: (state) => state.userCourses,
};

const actions = {
  async [updateUserInfo]({ commit }, payload = null) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!payload) {
      commit(updateUserInfo, user);
      return;
    }
    const { data } = await http.put(user._id, payload);
    commit(updateUserInfo, data);
    toastSuccess('Successfully update user info!');
  },
  async [getUserCourses]({ commit }) {
    const userId = JSON.parse(localStorage.getItem('userInfo'))._id;

    const { data } = await http.get(
      `courses/?query={"_acl.creator":"${userId}"}`
    );
    commit(getUserCourses, data);
  },
};

const mutations = {
  [updateUserInfo](state, payload) {
    Object.assign(state, { userInfo: payload });
  },
  [getUserCourses](state, payload) {
    Object.assign(state, { userCourses: payload });
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
