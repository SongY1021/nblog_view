<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部(99)" name="first">全部文章</el-tab-pane>
    <el-tab-pane label="公开(10)" name="second">公开文章</el-tab-pane>
    <el-tab-pane label="私密(5)" name="third">私密文章</el-tab-pane>
    <el-tab-pane label="草稿箱(80)" name="fourth">草稿箱</el-tab-pane>
    <el-tab-pane label="回收站(4)" name="five">回收站</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
</style>
