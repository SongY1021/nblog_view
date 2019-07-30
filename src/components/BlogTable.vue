<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="toolbar">
          <div class="search-item">
            <el-select v-model="typeValue" clearable placeholder="文章类型" style="width: 100px">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input
              placeholder="通过标题搜索该分类下的博客..."
              prefix-icon="el-icon-search"
              v-model="keywords" style="width: 300px">
            </el-input>
            <el-button type="primary" icon="el-icon-search" style="height:38px;vertical-align: middle; display: inline">搜索</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="data_warp">

          <el-table
          :data="tableData"
          :show-header="false"
          style="width: 100%">
            <el-scrollbar class="table-scrollbar">
          <el-table-column>
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24"><div class="grid-content-title">
                  <span class="title-tag" v-if="scope.row.state==='0'">草稿</span>
                  <span class="title-tag" v-if="scope.row.state==='1' && scope.row.isTop>0">置顶</span>
                  {{ scope.row.name }}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content-detail">
                  <ul class="detail-list" >
                    <li class="detail-list-item">
                      <span v-if="scope.row.type === '1'">原创</span>
                      <span v-if="scope.row.type === '2'">转载</span>
                      <span v-if="scope.row.type === '3'">翻译</span>
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
                    <li class="detail-list-item" v-if="scope.row.state != '0'">
                      <a href="javascript:;" class="item-btn" v-if="scope.row.isComment >0">禁止评论</a>
                      <a href="javascript:;" class="item-btn" v-else>允许评论</a>
                    </li>
                    <li class="detail-list-item" v-if="scope.row.state != '0'">
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
            </el-scrollbar>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keywords: '',
      typeValue: '',
      typeOptions: [{
        value: '1',
        label: '原创'
      }, {
        value: '2',
        label: '转载'
      }, {
        value: '3',
        label: '翻译'
      }],
      tableData: [{
        date: '2019-05-02 17:31:12',
        name: 'Linux安装RabbitMQ',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '0',
        type: '1',
        state: '1'
      }, {
        date: '2018-07-02 17:31:00',
        name: 'SSH免密登录设置Q',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '0',
        isTop: '1',
        type: '2',
        state: '2'
      }, {
        date: '2017-09-02 10:00:43',
        name: 'Zookeeper集群搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '3',
        state: '0'
      }, {
        date: '2016-10-08 17:53:49',
        name: 'Spring入门学习——环境搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '1',
        state: '0'
      },{
        date: '2019-05-02 17:31:12',
        name: 'Linux安装RabbitMQ',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '0',
        type: '1',
        state: '1'
      }, {
        date: '2018-07-02 17:31:00',
        name: 'SSH免密登录设置Q',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '0',
        isTop: '1',
        type: '2',
        state: '2'
      }, {
        date: '2017-09-02 10:00:43',
        name: 'Zookeeper集群搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '3',
        state: '0'
      }, {
        date: '2016-10-08 17:53:49',
        name: 'Spring入门学习——环境搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '1',
        state: '0'
      },{
        date: '2019-05-02 17:31:12',
        name: 'Linux安装RabbitMQ',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '0',
        type: '1',
        state: '1'
      }, {
        date: '2018-07-02 17:31:00',
        name: 'SSH免密登录设置Q',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '0',
        isTop: '1',
        type: '2',
        state: '2'
      }, {
        date: '2017-09-02 10:00:43',
        name: 'Zookeeper集群搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '3',
        state: '0'
      }, {
        date: '2016-10-08 17:53:49',
        name: 'Spring入门学习——环境搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '1',
        state: '0'
      },{
        date: '2019-05-02 17:31:12',
        name: 'Linux安装RabbitMQ',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '0',
        type: '1',
        state: '1'
      }, {
        date: '2018-07-02 17:31:00',
        name: 'SSH免密登录设置Q',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '0',
        isTop: '1',
        type: '2',
        state: '2'
      }, {
        date: '2017-09-02 10:00:43',
        name: 'Zookeeper集群搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '3',
        state: '0'
      }, {
        date: '2016-10-08 17:53:49',
        name: 'Spring入门学习——环境搭建',
        read: '12',
        comment: '10',
        tag: '原创',
        isComment: '1',
        isTop: '1',
        type: '1',
        state: '0'
      }]
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.toolbar{
  padding: 20px 10px;
  background-color: rgba(232, 234, 236, 0.81);
  border-bottom: #EBEEF5 solid 1px;
}
.toolbar .search-item{
  display: inline;
}
.grid-content-title{
  cursor: pointer;
  font-size: 20px;
  line-height: 40px;
}
.data_warp{
  height: 100%;
  overflow-x: hidden;
}
.data_warp .table-scrollbar{
  height: 100%;
}
.data_warp .table-scrollbar>>>.el-scrollbar__wrap{
  overflow-x: hidden;
}
.grid-content-title:hover{
  color: #409EFF;
}
.grid-content-title .title-tag{
  margin-right: 10px;
  padding:4px 8px;
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
