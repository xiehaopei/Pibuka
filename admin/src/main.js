import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/api/axios';
import '@/config/rem';

import { Button, Message, Menu, MenuItem, Avatar, Container, Aside, Main } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Avatar);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.prototype.$Message = Message;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
