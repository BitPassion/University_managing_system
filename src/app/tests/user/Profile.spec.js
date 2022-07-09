import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as userModule,
  updateUserInfo,
  getUserCourses
} from '../../user/+store/user-state';
import AppProfile from '../../user/components/Profile.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppProfile.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let router;
  let vuetify;
  let wrapper;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    state = {
      userInfo: {
        _id: '5e80d30f63d86c0016de2582',
        name: 'Test Testov',
        email: 'test@test.com',
        department: 'Mathematics',
        username: 'test'
      },
      userCourses: [
        {
          _id: '5e80d4786498950015dc3acb',
          title: 'Java Fundamentals',
          duration: 6,
          startDate: '2020-04-12',
          available: true,
          description:
            'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomi',
          selectedFile: {},
          imageUrl:
            'https://firebasestorage.googleapis.com/v0/b/university-system-dfd77.appspot.com/o/images%2Fjava.jpeg?alt=media&token=c2016273-4c18-4b9c-849d-644100eb197e',
          students: [],
          _acl: { creator: '5e80d30f63d86c0016de2582' }
        }
      ]
    };

    mutations = userModule.mutations;

    actions = {
      [getUserCourses]: jest.fn(),
      [updateUserInfo]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        userModule: {
          namespaced: true,
          state,
          actions,
          mutations,
          getters: userModule.getters
        }
      }
    });

    wrapper = shallowMount(AppProfile, {
      store,
      router,
      localVue,
      vuetify
    });
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Render the user full name', async () => {
    await wrapper.vm.$nextTick();
    const userFullName = wrapper.vm.$store.getters['userModule/userInfo'].name;
    const htmlElement = wrapper.find('.fullname').html();
    expect(htmlElement).toContain(userFullName);
  });

  it('Dispatched actions "getUserCourses" and "updateUserInfo" when component is created', async () => {
    await wrapper.vm.$nextTick();
    expect(actions[getUserCourses]).toHaveBeenCalled();
    expect(actions[updateUserInfo]).toHaveBeenCalled();
  });
});
