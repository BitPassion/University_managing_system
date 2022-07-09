import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as courseModule,
  getAllCourses,
  deleteCourse,
} from '../../courses/+store/course-state';
import { default as userModule } from '../../user//+store/user-state';
import AppList from '../../courses/components/List.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppList.vue', () => {
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
          _acl: {
            creator: '5e80d30f63d86c0016de2582',
          },
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test',
        },
      ],
      courseSearch: [
        {
          _acl: {
            creator: '5e80d30f63d86c0016de2582',
          },
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test',
        },
      ],
    };

    mutations = courseModule.mutations;

    actions = {
      [deleteCourse]: jest.fn(),
      [getAllCourses]: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        courseModule: {
          namespaced: true,
          state,
          actions,
          mutations,
          getters: courseModule.getters,
        },
        userModule: {
          namespaced: true,
          state: {
            userInfo: {
              _id: '5e80d30f63d86c0016de2582',
            },
          },
          actions: {},
          getters: userModule.getters,
        },
      },
    });

    options = {
      store,
      router,
      localVue,
      vuetify,
    };

    wrapper = shallowMount(AppList, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Renders the course title', () => {
    const courseTitle =
      wrapper.vm.$store.getters['courseModule/allCourses'][0].title;
    const htmlElement = wrapper.find('.title').html();
    expect(htmlElement).toContain(courseTitle);
  });

  it('Calls "deleteCourse" when "delete" button is clicked', async () => {
    const deleteCourse = jest.fn();
    wrapper.setMethods({
      deleteCourse,
    });
    wrapper.find('.btn-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(deleteCourse).toHaveBeenCalled();
  });

  it('Dispatched action "deleteCourse" when "delete" button is clicked', async () => {
    wrapper.find('.btn-delete').trigger('click');
    await wrapper.vm.$nextTick();
    expect(actions[deleteCourse]).toHaveBeenCalled();
  });
  it('Direct to "/course/:id" after click button "View"', async () => {
    const course = wrapper.vm.$store.getters['courseModule/allCourses'][0];
    const route = `/course/${course._id}`;
    wrapper.find('.btn-detail').trigger('click');
    await wrapper.vm.$nextTick();
    wrapper.vm.$router.push(route);
    expect(wrapper.vm.$route.path).toEqual(route);
  });
});
