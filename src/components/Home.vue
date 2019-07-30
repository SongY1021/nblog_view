<template>
  <el-container  class="home_container">
    <el-aside width="auto" :collapse="isCollapse">
      <div class="logo" >
        <transition name="open">
          <span class="title_open" v-show="!isCollapse">管理平台</span>
        </transition>
        <span class="title_close" v-show="isCollapse"></span>
      </div>
      <el-menu
        default-active="0"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#2f4050"
        text-color="#fff"
         router>
        <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="item.children.length>1" :key="index">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
              {{child.name}}
            </el-menu-item>
          </el-submenu>
          <template v-else>
            <el-menu-item :index="item.children[0].path">
              <i :class="item.children[0].iconCls"></i>
              <span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header_toolbar" height="50px">
        <ul class="toolbar_menu">
          <li class="toolbar_item"  @click="collapseStatus" title="侧栏收起展开">
            <a href="javascript:;" class="box_item">
              <i class="icon-font el-icon-nblog-shouqi" v-if="!isCollapse"></i>
              <i class="icon-font el-icon-nblog-zhankai" v-if="isCollapse"></i>
            </a>
          </li>
        </ul>
        <ul class="toolbar_menu menu_right">
          <li class="toolbar_item" title="消息">
            <a href="javascript:;" class="box_item">
              <el-badge is-dot class="item">
                <i class="icon-font el-icon-nblog-tongzhi"></i>
              </el-badge>
            </a>
          </li>
          <li class="toolbar_item"  @click="screenStatus" title="全屏">
            <a href="javascript:;" class="box_item">
              <i class="icon-font el-icon-nblog-quanpingzuidahua" v-if="!isFullScreen"></i>
              <i class="icon-font el-icon-nblog-tuichuquanping" v-if="isFullScreen"></i>
            </a>
          </li>
          <li class="toolbar_item" @mouseover="selectStatus">
            <el-dropdown @command="handleCommand">
              <a href="javascript:;" class="box_item">
                <span class="el-dropdown-link">
                  {{currentUserName}}
                  <i class="icon-font el-icon-nblog-xiala-1" v-if="!isSelect"></i>
                  <i class="icon-font el-icon-nblog-shang-" v-if="isSelect"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人主页</el-dropdown-item>
                  <el-dropdown-item>我的文章</el-dropdown-item>
                  <el-dropdown-item>账号信息</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </a>
            </el-dropdown>
          </li>
          <li class="toolbar_item" title="更多">
            <a href="javascript:;" class="box_item">
              <i class="icon-font el-icon-nblog-gengduo"></i>
            </a>
          </li>
        </ul>
      </el-header>
      <el-header class="breadcrumb" height="45px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <div class="content">
            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </div>
      </el-main>
      <el-footer height="40px"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import {getRequest} from '../utils/api'

export default {
  data () {
    return {
      activeIndex: '-1',
      isCollapse: false,
      isFullScreen: false,
      isSelect: false,
      currentUserName: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key)
    },
    collapseStatus () {
      this.isCollapse = !this.isCollapse
    },
    screenStatus () {
      this.isFullScreen = !this.isFullScreen
      if (this.isFullScreen) {
        var element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen()
        }
      }else{
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
      }
    },
    selectStatus () {
      this.isSelect = !this.isSelect
    },
    handleCommand (command) {
      var _this = this;
      if (command == 'logout') {
        this.$confirm('注销登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          getRequest('/logout')
          _this.currentUserName = '游客';
          _this.$router.replace({path: '/'});
        }, function () {
          //取消
        })
      }
    }
  },
  mounted: function () {
    var _this = this
    getRequest('/currentUserInfo').then(function (o) {
      if (o.data.code === 0) {
        _this.currentUserName = o.data.reqData.username
      } else {
        _this.currentUserName = '游客'
      }
    }, function (msg) {
      _this.currentUserName = '游客'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  i{color:#FFFFFF;}
  .el-aside .icon-font{
    margin-right: 10px;
  }
  .el-menu-item.is-active {
    font-weight: bold;
  }
  .open-enter-active, .open-enter{
    transition: opacity 2s;
  }
  .open-enter, .opene-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .el-aside .el-menu{
    margin-top: 20px;
    border: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-breadcrumb{
    line-height: 45px;
  }
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .el-aside {
    background-color: #2f4050;
  }
  .el-aside .logo{
    width: 100%;
    border-bottom: #273949 solid 1px;
  }
  .el-aside .title_open{
    display: flex;
    margin-left: 30px;
    padding-left: 55px;
    line-height: 50px;
    font-size: 16px;
    color: #FFF;
    background-image: url("../assets/img/logo-w.png");
    background-size: 46px;
    background-repeat: no-repeat;
  }
  .el-aside .title_close{
    display: block;
    width: auto;
    height: 50px;
    background-image: url("../assets/img/logo-w.png");
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .el-header{
    padding: 0;
    border-bottom: #eaeaea solid 1px;
    background-color: #f8f8f8;
  }
  .header_toolbar{
    line-height: 50px;
  }
  .header_toolbar .toolbar_menu{
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    z-index: 20;
  }
  .header_toolbar .toolbar_menu .toolbar_item{
    position: relative;
    float: left;
    height: 50px;
    line-height: 50px;
    margin: 0;
    /*border-top: 2px solid transparent;*/
    color: #909399;
    font-size: 14px;
    /*padding: 0 20px;*/
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    -o-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .header_toolbar .toolbar_menu .toolbar_item .box_item{
    display: inline-block;
    padding: 0 15px;
  }
  .header_toolbar .toolbar_menu .toolbar_item:before{
    content: "";
    position: absolute;
    left: 5%;
    top: 0px;
    width: 0;
    height: 2px;
    background: #2f4050;
    transition: all .2s;
  }
  .header_toolbar .toolbar_menu .toolbar_item:hover:before{
    width: 100%;
    left: 0;
    right: 0;
  }
  .header_toolbar .toolbar_menu .toolbar_item .el-badge{
    display: inline;
    vertical-align: auto;
  }
  .header_toolbar .toolbar_menu .toolbar_item .el-dropdown {
    /*vertical-align: middle;*/
  }
  .header_toolbar .toolbar_menu .toolbar_item a{
    text-decoration: none;
    color: #606266;
  }
  .el-dropdown-link{
    /*display: inline-block;*/
    /*vertical-align: middle;*/
  }
  .el-dropdown-menu {
    top: 34px !important;
  }
  .menu_right{
    float: right;
  }
  .breadcrumb{
    padding: 0 20px;
    position: relative;
    border-bottom: #e9e9e9 solid 1px;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,.05);
    background-color: #f8f8f8;
  }
  .el-footer{
    border-top: #e9e9e9 solid 1px;
    background-color: #f3f3f4;
  }
  .el-main{
    height: 100%;
    overflow: hidden;
    padding:15px;
    background-color: #F2F2F2;
  }
  .el-main .content{
    padding:10px 15px;
    background-color: #f8f8f8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
