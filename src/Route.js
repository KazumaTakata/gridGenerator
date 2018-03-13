import Vue from 'vue'
import VueRouter from 'vue-router'
import GridMain from "./gridLayoutMain.vue"
import ElementEdit from "./elementEdit.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/gridEdit', component: GridMain },
  { path: '/elementEdit', component: ElementEdit }
]

const router = new VueRouter({
  routes
})


export default router
