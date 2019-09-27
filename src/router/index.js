import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: resolve => require(['@/components/HelloWorld.vue'], resolve),
    meta: {
      title: '尚诚CRM'
    }
  },
  {
    path: '/demo',
    component: resolve => require(['@/components/HelloWorld.vue'], resolve),
    meta: {
      title: '尚诚CRM'
    }
  }
]

const router = new Router({
  base: '/',
  mode: 'history',
  routes
})

export default router
