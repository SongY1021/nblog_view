<template>
  <el-container  class="home_container">
    <el-aside width="240px">
      <div class="logo">
        <span class="title">管理平台</span>
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2f4050"
        text-color="#fff"
        active-text-color="#ffd04b" router>
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
      <el-header>
      </el-header>
      <el-header class="breadcrumb" height="45px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>
      </el-main>
      <el-footer height="40px"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  i{color:#FFFFFF;}
  .icon-font{
    margin-right: 10px;
  }
  .el-menu{
    margin-top: 20px;
    border: none;
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
  .el-aside .title{
    display: flex;
    margin-left: 20px;
    padding-left: 70px;
    line-height: 60px;
    font-size: 20px;
    color: #FFF;
    background-image: url("../assets/img/logo-w.png");
    background-size: 60px;
    background-repeat: no-repeat;
  }
  .el-header{
    border-bottom: #eaeaea solid 1px;
    background-color: #f3f3f3;
  }
  .breadcrumb{
    position: relative;
    border-bottom: #e9e9e9 solid 1px;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,.05);
    background-color: #f3f3f4;
  }
  .el-footer{
    border-top: #e9e9e9 solid 1px;
    background-color: #f3f3f4;
  }
  .el-main{
    background-color: #F2F2F2;
  }
</style>
