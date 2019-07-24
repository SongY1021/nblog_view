import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

const HelloWord = () => import('@/components/HelloWorld')

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    }, {
      path: '/home',
      hidden: true,
      component: HelloWord
    }
  ]
})
