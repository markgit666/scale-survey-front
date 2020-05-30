import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './views/Global'
import axios from 'axios'

// 挂载到Vue实例上面
import 'jquery'
import Validate from './assets/lib/rules.js'// 引用文件
Vue.prototype.GLOBAL = global
// import $ from 'jquery'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;
// import { $axios } from './assets/lib/util.js'
// Vue.prototype.$http = $axios
// Vue.use($)
Vue.use(Validate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
