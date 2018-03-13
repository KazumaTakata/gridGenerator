import Vue from 'vue'
import App from './App.vue'
import Toast from 'vue-easy-toast'
import VueRouter from 'vue-router'
import store from "./store"
import router from "./Route"

Vue.use(VueRouter)
Vue.use(Toast)


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
