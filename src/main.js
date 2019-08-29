import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './views/Global'//引用文件
Vue.prototype.GLOBAL = global//挂载到Vue实例上面
// import $ from 'jquery'
Vue.config.productionTip = false
// Vue.use($)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
