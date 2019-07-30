<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部(99)" name="first">
      <blog_table></blog_table>
    </el-tab-pane>
    <el-tab-pane label="公开(10)" name="second">公开文章</el-tab-pane>
    <el-tab-pane label="私密(5)" name="third">私密文章</el-tab-pane>
    <el-tab-pane label="草稿箱(80)" name="fourth">草稿箱</el-tab-pane>
    <el-tab-pane label="回收站(4)" name="five">回收站</el-tab-pane>
    <el-tab-pane label="博客管理" name="six">回收站</el-tab-pane>
  </el-tabs>
</template>

<script>
import BlogTable from '@/components/BlogTable'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    'blog_table': BlogTable
  }
}
</script>

<style scoped>
  .el-tabs,{
    height: 100%;
  }
</style>
