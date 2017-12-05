// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from  'axios'
import vueLazyLoad from 'vue-lazyload'
import vuex from 'vuex'
import Store from './store/index'

Vue.use(vuex)
let store = new vuex.Store(Store)
Vue.use(vueLazyLoad,{
  loading:'/static/loading-svg/loading-bars.svg'
})
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
