// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//引入axios
import Axios from 'axios';
//引入nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 全局配置
import './assets/js/config';

Vue.config.productionTip = false
Vue.prototype.$axios = Axios;

Vue.prototype.$loadingText = '数据加载中，请稍候...';
Vue.prototype.$emptyTableText = '没有搜到任何数据'
Vue.prototype.$logoutCount = 0;

Axios.defaults.withCredentials = true;

NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
});

// Axios请求拦截
Axios.interceptors.request.use(function(config) {
  let now = (new Date()).getTime();
  // 请求开始，蓝色过渡滚动条开始出现
  NProgress.start();

  if (config.url.indexOf('?') < 0) {
      config.url += '?t=' + now;
  } else {
      config.url += '&t=' + now;
  }
  // 在发送请求设置cancel token
  config.cancelToken = new Axios.CancelToken(cancel => {
      axiosPromiseArr.push({ cancel })
  })
  return config;
}, function(error) {
  // Do something with request error
  Vue.prototype.$message.error('出错了!');
  return Promise.reject(error);
});


//全局的AXios返回出错请求处理
Axios.interceptors.response.use(function(response) {
   if (response.data.code == -1 && response.data.error == '无法获取数据，请先登录') {
          localStorage.clear();
          console.log(Vue.prototype.$logoutCount, 'count')
          Vue.prototype.$logoutCount++;
          if (Vue.prototype.$logoutCount == 1) {
              Vue.prototype.$notify({
                  type: 'error',
                  offset: 10,
                  duration: 2000,
                  message: response.data.error
              });
              router.replace({
                  path: '/login',
                  // query: { redirect: router.currentRoute.fullPath }
              });
          }
      } else if (response.data.code == -1 && response.data.error == '接口调用异常') {
  
          Vue.prototype.$notify({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: response.data.error
          })
      } else if (response.data.code == -1) {
          Vue.prototype.$message({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: response.data.data || response.data.message,
          })
      }
      NProgress.done();
      return response;
  }, function(error) {
      // alert(error.response.status)
      console.log(error, 'ressss')
      if (error.response && error.response.status == 401 && error.response.data.error == 'Unauthorized') {
          router.replace({
              path: '/login',
          })
          Vue.prototype.$notify({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: '无法获取用户信息，请登录！'
          })
      } else if (error.response && error.response.status == 401) {
          Vue.prototype.$message({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: error.response.data.message,
          })
      } else if (error.response && error.response.status == 403 && error.response.message == 'Forbidden') {
          Vue.prototype.$notify({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: '无该模块的权限，无法获取相关数据'
          })
      } else if (error.status == 500) {
          Vue.prototype.$notify({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: '接口返回出错了，请检查！'
          })
      } else if (error.message === 'Network Error') {
          Vue.prototype.$notify({
              type: 'error',
              offset: 10,
              duration: 2000,
              message: '无法获得数据！',
          })
      }
  
      NProgress.done();
  
  })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
