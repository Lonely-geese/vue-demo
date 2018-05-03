import Vue from 'vue'
import VueRouter from 'vue-router'
import Less from 'Less'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import App from './App'
import routes from './router.config'
import Loading from './components/loading'
import store from './store/'
require('./assets/css/base.css');

Vue.config.productionTip = false

Vue.use(Less);
Vue.use(VueRouter);
Vue.use(Loading);
/* eslint-disable no-new */

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/err.png'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1,
  listenEvents: ['scroll']
});
const router = new VueRouter({
  mode: 'history',
  scorllBehavior: () => ({
    y: 0

  }),
  routes
});
//axios的使用
axios.interceptors.request.use(function(config) { //配置发送请求的信息
  store.dispatch('showLoading');
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
  store.dispatch('hideLoading');
  return response;
}, function(error) {
  return Promise.reject(error);
});
axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;axios.interceptors.request.use(function(config) { //配置发送请求的信息
  store.dispatch('showLoading');
  return config;
}, function(error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function(response) { //配置请求回来的信息
  store.dispatch('hideLoading');
  return response;
}, function(error) {
  return Promise.reject(error);
});
axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = axios;

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.user_id) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
    console.log("================");
  } else {
    console.log("nnnnnnnnnnnnnnnnnn");
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
