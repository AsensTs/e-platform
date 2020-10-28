import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import "./plugins/element.js";
import "./assets/styles/global.scss";

import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
Vue.prototype.$http = axios;

//请求拦截
axios.interceptors.request.use(config => {
  // 请求服务器之前做出的拦截， 所以Authorization为null
  config.headers.Authorization = window.sessionStorage.getItem("stoken");
  return config;
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
