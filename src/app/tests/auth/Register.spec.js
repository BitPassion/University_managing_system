import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import {
  default as authModule,
  register
} from '../../auth/+store/auth-state';
import AppRegister from '../../auth/components/Register.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppRegister.vue', () => {
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
    state = {};

    mutations = authModule.mutations;

    actions = {
      [register]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        authModule: {
          state,
          actions,
          mutations,
          getters: authModule.getters
        }
      }
    });
    options = {
      store,
      router,
      localVue,
      vuetify,
      stubs: {
        RouterLink: RouterLinkStub
      }
    };
    wrapper = shallowMount(AppRegister, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Calls "register" when "Register" button is clicked', () => {
    const register = jest.fn();
    wrapper.setMethods({
      register
    });
    wrapper.find({ ref: 'registerForm' }).trigger('submit');
    expect(register).toHaveBeenCalled();
  });

  it('Dispatch action "register" when "Register" button is clicked', () => {
    wrapper.find({ ref: 'registerForm' }).trigger('submit');
    expect(actions[register]).toHaveBeenCalled();
  });

  it('Component should has all required properties', () => {
    const requiredProps = [
      'username',
      'password',
      'department',
      'name',
      'email'
    ];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });

  it('Input fields should be "6"', () => {
    const fields = wrapper.findAll('v-text-field-stub').length;
    expect(fields).toEqual(6);
  });

  it('Router link should go to "/auth/login"', () => {
    expect(wrapper.find(RouterLinkStub).props().to.path).toBe('/auth/login')
  })
});
