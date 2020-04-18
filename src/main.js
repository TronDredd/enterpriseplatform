import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/axios'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import ant from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Echarts from 'echarts'
import dateFormat from "./utils/dateFormat";


Vue.use(ant)
Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$ = window.jQuery;
Vue.prototype.$echarts = Echarts;
Vue.prototype.getUpdateTime = () => {
  const update_time = new Date()
  return dateFormat('YYYY-mm-dd HH:MM:SS', update_time);
};

Vue.use(Echarts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
