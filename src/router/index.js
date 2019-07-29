import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

const Home = () => import('@/components/Home')
const test = () => import('@/components/test')
const ArticleList = () => import('@/components/ArticleList')

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      hidden: true,
      component: Login
    },
    {
      path: '/home',
      hidden: true,
      component: Home
    }, {
      path: '/home',
      component: Home,
      name: '文章管理',
      iconCls: 'icon-font el-icon-nblog-xiangmu',
      children: [
        {
          path: '/articleList',
          name: '文章列表',
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        }, {
          path: '/postArticle',
          name: '发表文章',
          component: test,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/blogDetail',
          name: '博客详情',
          component: test,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }, {
          path: '/editBlog',
          name: '编辑博客',
          component: test,
          hidden: true,
          meta: {
            keepAlive: false
          }
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '栏目管理',
      children: [
        {
          path: '/cateMana',
          iconCls: 'icon-font el-icon-nblog-lanmu',
          name: '栏目管理',
          component: test
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '数据统计',
      iconCls: 'icon-font el-icon-nblog-shujutongji',
      children: [
        {
          path: '/charts',
          iconCls: 'icon-font el-icon-nblog-shujutongji',
          name: '数据统计',
          component: test
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '用户管理',
      children: [
        {
          path: '/user',
          iconCls: 'icon-font el-icon-nblog-kehu',
          name: '用户管理',
          component: test
        }
      ]
    }
  ]
})
