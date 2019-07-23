import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import hello from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    },
    {
      path: '/hello',
      hidden: true,
      component: hello
    }
  ]
})
