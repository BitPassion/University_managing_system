import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as courseModule,
  createCourse
} from '../../courses/+store/course-state';
import { AppCreate } from '../../courses/components';

Vue.use(Vuetify);
Vue.use(VueRouter);

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Testing AppCreate.vue', () => {
  let actions;
  let state;
  let store;
  let vuetify;
  let router;
  let wrapper;
  let options;
  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();

    state = {};

    actions = {
      [createCourse]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        courseModule: {
          namespaced: true,
          state,
          actions,
          getters: courseModule.getters
        }
      }
    });

    options = {
      store,
      localVue,
      vuetify,
      router
    };

    wrapper = shallowMount(AppCreate, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Calls "createCourse" when "Create" button is clicked', async () => {
    const createCourse = jest.fn();
    wrapper.setMethods({
      createCourse
    });
    wrapper.find('.submit').trigger('submit');
    await wrapper.vm.$nextTick();
    expect(createCourse).toHaveBeenCalled();
  });

  it('Dispatch action "createCourse" when "Create" button is clicked', async () => {
    wrapper.find('.submit').trigger('submit');
    await wrapper.vm.$nextTick();
    expect(actions[createCourse]).toHaveBeenCalled();
  });

  it('Component has all required properties', () => {
    const requiredProps = [
      'title',
      'duration',
      'startDate',
      'description',
      'selectedFile',
      'students'
    ];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });

  it('Input should fields should be "5"', () => {
    const textFields = wrapper.findAll('v-text-field-stub').length;
    const inputFields = wrapper.findAll('v-file-input-stub').length;
    const menuFields = wrapper.findAll('v-menu-stub').length;
    const textAreaFields = wrapper.findAll('v-textarea-stub').length;
    const totalFileds = textAreaFields + inputFields + menuFields + textFields;
    expect(totalFileds).toEqual(5);
  });
});
