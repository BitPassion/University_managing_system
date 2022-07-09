import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as userModule,
  updateUserInfo
} from '../../user/+store/user-state';
import AppEditForm from '../../user/components/EditForm.vue';

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

    wrapper = shallowMount(AppEditForm, {
      store,
      router,
      localVue,
      vuetify
    });
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Dispatched actions "updateUserInfo" when button "Update" is clicked', async () => {
    wrapper.find({ ref: 'updateForm' }).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(actions[updateUserInfo]).toHaveBeenCalled();
  });

  it('Call method "updateForm" when form is submit', async () => {
    const updateForm = jest.fn();
    wrapper.setMethods({
      updateForm
    });
    wrapper.find({ ref: 'updateForm' }).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(updateForm).toHaveBeenCalled();
  });

  it('Component should has all required properties', () => {
    const requiredProps = ['user'];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });
});
