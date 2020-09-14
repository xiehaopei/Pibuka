import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/api/axios';
import '@/config/rem';
import '@/plugins/element';
import mavonEditor from 'yj-mavoneditor';
import 'yj-mavoneditor/dist/css/index.css';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(mavonEditor);

Vue.filter('dateFormat', function(originVal) {
  const dateTime = new Date(originVal);
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1 + '').padStart(2, '0');
  const day = (dateTime.getDate() + '').padStart(2, '0');
  const hh = (dateTime.getHours() + '').padStart(2, '0');
  const mm = (dateTime.getMinutes() + '').padStart(2, '0');
  const ss = (dateTime.getSeconds() + '').padStart(2, '0');
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
