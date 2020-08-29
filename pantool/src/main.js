import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
require('./plugins/element')
require('./assets/main.css')
axios.defaults.baseURL='http://localhost:3000'
Vue.prototype.$http=axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
