import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import {
  default as authModule,
  login
} from '../../auth/+store/auth-state';
import AppLogin from '../../auth/components/Login.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppLogin.vue', () => {
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
      [login]: jest.fn()
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

    wrapper = shallowMount(AppLogin, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Calls "login" when "Login" button is clicked',async () => {
    const login = jest.fn();
    wrapper.setMethods({
      login
    });
    wrapper.find({ ref: 'loginForm' }).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(login).toHaveBeenCalled();
  });

  it('Dispatch action "login" when "login" button is clicked',async () => {
    wrapper.find({ ref: 'loginForm' }).trigger('submit');
    await wrapper.vm.$nextTick();
    expect(actions[login]).toHaveBeenCalled();
  });

  it('Component should has all required properties', () => {
    const requiredProps = ['username', 'password'];
    const componentProps = Object.keys(wrapper.vm.$data);
    const hasAllProps = requiredProps.every(
      e => componentProps.indexOf(e) >= 0
    );
    expect(hasAllProps).toEqual(true);
  });

  it('Input fields should be "2"', () => {
    const fields = wrapper.findAll('v-text-field-stub').length;
    expect(fields).toEqual(2);
  });

  it('Router link should go to "/auth/register"', () => {
    expect(wrapper.find(RouterLinkStub).props().to.path).toBe('/auth/register');
  });
});
