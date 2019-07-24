<template>
  <el-container  class="home_container">
    <el-aside></el-aside>
    <el-container>
      <el-header ></el-header>
      <el-main></el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  beforeCreate () {
    window.document.body.className = 'body'
  },
  beforeDestroy () {
    window.document.body.className = ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .el-aside {
    width: 200px;
    background-color: #404040;
  }
  .el-header{
    height: 80px;
    background-color: #0086b3;
  }
  .el-footer{
    height:80px;
    background-color: #0086b3;
  }
</style>
