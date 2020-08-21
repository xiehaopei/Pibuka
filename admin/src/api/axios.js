import axios from 'axios';
import config from '@/config';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

axios.interceptors.request.use(config => {
  NProgress.start();
  if (sessionStorage.token) {
    config.headers.Authorization = window.sessionStorage.getItem('token');
  }
  console.log('拦截请求');
  return config;
});

axios.interceptors.response.use(res => {
  NProgress.done();
  console.log('处理响应', res);
  return res;
});

export default axios;
