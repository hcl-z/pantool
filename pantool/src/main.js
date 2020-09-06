import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
require('./plugins/element')
require('./assets/main.css')
axios.defaults.baseURL='http://localhost:3000'
axios.defaults.withCredentials = true;
/* axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); */

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)
  if(response.data.code==-1){
    router.push('/login')
  }else{
    return response;
  }
  
}, function (error) {
  // 对响应错误做点什么
  return error
});
Vue.prototype.$http=axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
