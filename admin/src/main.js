import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/api/axios';
import '@/config/rem';
import '@/plugins/element';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
