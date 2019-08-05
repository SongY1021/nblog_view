<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="totleCount" name="first">
      <blog_table state="-1" :heightNum="heightNum"></blog_table>
    </el-tab-pane>
    <el-tab-pane :label="openCount" name="second">
      <blog_table state="1" :heightNum="heightNum"></blog_table>
    </el-tab-pane>
    <el-tab-pane :label="privateCount" name="third">
      <blog_table state="2" :heightNum="heightNum"></blog_table>
    </el-tab-pane>
    <el-tab-pane :label="draftCount" name="fourth">
      <blog_table state="0" :heightNum="heightNum"></blog_table>
    </el-tab-pane>
    <el-tab-pane :label="delCount" name="five">
      <blog_table state="3" :heightNum="heightNum"></blog_table>
    </el-tab-pane>
    <el-tab-pane label="博客管理" name="six">回收站</el-tab-pane>
  </el-tabs>
</template>

<script>
import BlogTable from '@/components/BlogTable'
import {getRequest} from '@/utils/api'

export default {
  data () {
    return {
      minHeight: false,
      heightNum: '610px',
      activeName: 'first',
      totleCount: '全部(0)',
      openCount: '公开(0)',
      privateCount: '私密(0)',
      draftCount: '草稿箱(0)',
      delCount: '回收站(0)'
    }
  },
  mounted: function () {
    this.loadTip()
    // this.minHeight = window.innerHeight > 800?false:true
    this.heightNum = (window.innerHeight - 300) + 'px'
  },
  methods: {
    handleClick (tab, event) {
      // this.minHeight = window.innerHeight > 800?false:true
      this.heightNum = (window.innerHeight - 300) + 'px'
    },
    loadTip () {
      getRequest('/blog/tip').then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          let reqData = resp.data.reqData
          this.totleCount = '全部(' + reqData.totleCount + ')'
          this.openCount = '公开(' + reqData.openCount + ')'
          this.privateCount = '私密(' + reqData.privateCount + ')'
          this.draftCount = '草稿(' + reqData.draftCount + ')'
          this.delCount = '回收站(' + reqData.delCount + ')'
        }
      })
    }
  },
  components: {
    'blog_table': BlogTable
  }
}
</script>

<style scoped>
  .el-tabs{
    height: 100%;
  }
</style>
