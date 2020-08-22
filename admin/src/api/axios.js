import axios from 'axios';
import config from '@/config';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;

axios.interceptors.request.use(config => {
  NProgress.start();
  if (localStorage.token) {
    config.headers.Authorization = window.localStorage.getItem('token');
  }
  console.log('拦截请求');
  return config;
});

axios.interceptors.response.use(
  res => {
    NProgress.done();
    console.log('处理响应', res);
    return res;
  },
  err => {
    if (err.response.status === 401) {
      alert('token失效！');
      window.localStorage.removeItem('token');
      history.push('/login');
    } else {
      console.log('Error', err.message);
    }
  }
);

export default axios;
