<template>
  <div>
    <div class="search-item"  style="display: flex;">
      <el-input
        placeholder="通过标题搜索该分类下的博客..."
        prefix-icon="el-icon-search"
        v-model="keywords" style="width: 400px" size="medium">
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="medium" style="height:36px;vertical-align: middle; display: inline">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      :show-header="false"
      style="width: 100%">
      <el-table-column>
        <template slot-scope="scope">
          <el-row>
            <el-col :span="24"><div class="grid-content-title">
              <span class="title-tag" v-if="scope.row.isDraft>0">草稿</span>
              <span class="title-tag" v-if="scope.row.isDraft==='0' && scope.row.isTop>0">置顶</span>
              {{ scope.row.name }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid-content-detail">
              <ul class="detail-list" >
                <li class="detail-list-item" v-if="scope.row.isOriginal>0">
                  原创
                </li>
                <li class="detail-list-item">
                  {{ scope.row.date }}
                </li>
                <li class="detail-list-item" title="阅读">
                  <i class="icon-font el-icon-nblog-yueduliang"></i>{{ scope.row.read }}
                </li>
                <li class="detail-list-item" title="评论">
                  <i class="icon-font el-icon-nblog-pinglun"></i>{{ scope.row.comment }}
                </li>
              </ul>
            </div></el-col>
            <el-col :span="12"><div class="grid-content-operation">
              <ul class="detail-list" >
                <li class="detail-list-item">
                  <a href="javascript:;" class="item-btn">查看</a>
                </li>
                <li class="detail-list-item" v-if="scope.row.isDraft === '0'">
                  <a href="javascript:;" class="item-btn" v-if="scope.row.isComment >0">禁止评论</a>
                  <a href="javascript:;" class="item-btn" v-else>允许评论</a>
                </li>
                <li class="detail-list-item" v-if="scope.row.isDraft === '0'">
                  <a href="javascript:;" class="item-btn" v-if="scope.row.isTop >0">取消置顶</a>
                  <a href="javascript:;" class="item-btn" v-else>置顶</a>
                </li>
                <li class="detail-list-item">
                  <a href="javascript:;" class="item-btn-del">删除</a>
                </li>
              </ul>
            </div></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keywords: '',
      tableData: [{
        date: '2019-05-02 17:31:12',
        name: 'Linux安装RabbitMQ',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '0',
        isOriginal: '1',
        isDraft: '0'
      }, {
        date: '2018-07-02 17:31:00',
        name: 'SSH免密登录设置Q',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '0',
        isTop: '1',
        isOriginal: '0',
        isDraft: '1'
      }, {
        date: '2017-09-02 10:00:43',
        name: 'Zookeeper集群搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        isOriginal: '0',
        isDraft: '0'
      }, {
        date: '2016-10-08 17:53:49',
        name: 'Spring入门学习——环境搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        isOriginal: '1',
        isDraft: '0'
      }]
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.search-item{
  background-color: #FFF;
  border-bottom: #EBEEF5 solid 1px;
}
.grid-content-title{
  cursor: pointer;
  font-size: 20px;
  line-height: 40px;
}
.grid-content-title:hover{
  color: #409EFF;
}
.grid-content-title .title-tag{
  margin-right: 10px;
  padding:2px 8px;
  font-size: 12px;
  color: #999;
  border: #ddd solid 1px;
  vertical-align: middle;
}
.grid-content-detail,.grid-content-operation{
  line-height: 24px;
  font-size: 12px;
  color: #999;
}
.grid-content-operation{
  float: right;
}
.grid-content-detail .detail-list,.grid-content-operation .detail-list{
  list-style: none;
  margin: 0;
  padding-left: 0;
}
.grid-content-detail .detail-list-item, .grid-content-operation .detail-list-item{
  float: left;
  padding-right: 24px;
  line-height: 24px;
}
.detail-list-item .el-icon-nblog-yueduliang:before, .detail-list-item .el-icon-nblog-pinglun:before{
  color: #999;
  vertical-align: middle;
  margin-right: 3px;
}
.detail-list-item .item-btn{
  color: #1A9BDE;
}
.detail-list-item .item-btn-del{
  color: #C90F1A;
}
</style>
