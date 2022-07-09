import Vue from 'vue';
import App from './app/App.vue';
import vuetify from './plugins/vuetify';
import router from './app/app-router';
import store from './app/app-state';

Vue.config.productionTip = false


const EventBus = new Vue();

Vue.prototype.$bus = EventBus

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
