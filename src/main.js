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
import categoryMap from "./utils/categoryMap";
import {urlImageBase} from "./utils/urls";
import formatTime from "./utils/timeFormat";
import {registryAlertComponent} from "./components/AlertComponent";
import buyInOrSellMap from "./utils/buyInOrSellMap";
import md5 from 'js-md5';

Vue.use(ant);
Vue.use(registryAlertComponent);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$ = window.jQuery;
Vue.prototype.$echarts = Echarts;
Vue.prototype.getUpdateTime = () => {
  const update_time = new Date();
  return dateFormat('YYYY-mm-dd HH:MM:SS', update_time);
};
Vue.prototype.$categoryMap = categoryMap;
Vue.prototype.$buyInOrSellMap = buyInOrSellMap;
Vue.prototype.$urlImageBase = urlImageBase;
Vue.prototype.$formatTime = formatTime;
Vue.prototype.$md5 = md5;

Vue.use(Echarts);
Vue.use(registryAlertComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
