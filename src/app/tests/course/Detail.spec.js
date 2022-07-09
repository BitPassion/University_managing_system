import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as courseModule,
  getAllCourses,
  deleteCourse
} from '../../courses/+store/course-state';
import AppDetail from '../../courses/components/Detail.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppDetail.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let router;
  let vuetify;
  let wrapper;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    state = {
      allCourses: [
        {
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test'
        },
        {
          _id: 'e56256c4fg8h8500155df3b9',
          title: 'Javascript',
          duration: '3',
          startDate: '2020-04-20',
          students: [],
          description: 'Demo demo',
          available: true,
          imageUrl: 'https://demo.demo'
        }
      ]
    };

    mutations = courseModule.mutations;

    actions = {
      [getAllCourses]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        courseModule: {
          namespaced: true,
          state,
          actions,
          mutations,
          getters: courseModule.getters
        }
      }
    });
    options = {
      store,
      router,
      localVue,
      vuetify,
      propsData: {
        id: '2d6144c4ca822500155df3b9'
      }
    };
    wrapper = shallowMount(AppDetail, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Dispatched action "getAllCourses" in created hook', () => {
    expect(actions[getAllCourses]).toHaveBeenCalled();
  });

  it('Call "next()" when "next" arrow button is clicked', async () => {
    const next = jest.fn();
    wrapper.setMethods({
      next
    });
    wrapper.find('.btn-next').trigger('click');
    await wrapper.vm.$nextTick();
    expect(next).toHaveBeenCalled();
  });

  it('Call "prev()" when "prev" arrow button is clicked', async () => {
    const prev = jest.fn();
    wrapper.setMethods({
      prev
    });
    wrapper.find('.btn-prev').trigger('click');
    await wrapper.vm.$nextTick();
    expect(prev).toHaveBeenCalled();
  });

  it('Go to next course route after click "next" arrow button', async done => {
    const list = wrapper.vm.$store.getters['courseModule/allCourses'];
    const onboardingIdx = wrapper.vm.$data.onboarding;
    const nextId = list[onboardingIdx + 1]._id;
    const route = `/course/${nextId}`;
    wrapper.find('.btn-next').trigger('click');
    Vue.nextTick(() => {
      wrapper.vm.$router.push(route);
      Vue.nextTick(() => {
        expect(wrapper.vm.$route.path).toEqual(route);
        done()
      });
    });
  });

  it('Go to previous course route after click "prev" arrow button', async done => {
    const list = wrapper.vm.$store.getters['courseModule/allCourses'];
    const onboardingIdx = wrapper.vm.$data.onboarding;
    const nextId = onboardingIdx - 1 >= 0 ? list[onboardingIdx - 1]._id : list[list.length - 1]._id
    const route = `/course/${nextId}`;
    wrapper.find('.btn-prev').trigger('click');
    Vue.nextTick(() => {
      wrapper.vm.$router.push(route);
      Vue.nextTick(() => {
        expect(wrapper.vm.$route.path).toEqual(route);
        done()
      });
    });
  });
});
