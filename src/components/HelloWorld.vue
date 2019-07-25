<template>
  <el-container  class="home_container">
    <el-aside width="240px"></el-aside>
    <el-container>
      <el-header ></el-header>
      <el-main></el-main>
      <el-footer height="40px"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld'
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
    background-color: #2f4050;
  }
  .el-header{
    border-bottom: #e9e9e9 solid 1px;
    background-color: #f3f3f4;
  }
  .el-footer{
    border-top: #e9e9e9 solid 1px;
    background-color: #f3f3f4;
  }
</style>
