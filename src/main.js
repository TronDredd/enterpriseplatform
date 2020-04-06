import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"


Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$ = window.jQuery;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
