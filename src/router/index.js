import Vue from 'vue'
import Router from 'vue-router'
import zkpgl from '@/pages/zkpgl/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'zkpgl',
      component: zkpgl
    }
  ]
})
