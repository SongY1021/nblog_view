<template>
  <div class="tab-warp">
    <el-row>
      <el-col :span="24">
        <div class="toolbar">
          <div class="search-item">
            <el-select v-model="searchOpt.typeValue" placeholder="文章类型" clearable style="width: 110px">
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
              v-model="searchOpt.keywords" style="width: 300px">
            </el-input>
            <el-button type="primary" icon="el-icon-search" style="height:38px;vertical-align: middle; display: inline" @click="searchClick">搜索</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="data_warp" v-bind:style="{ height: heightNum }">
        <!--<el-scrollbar class="table-scrollbar">-->
          <el-table
          :data="tableData"
          :show-header="false"
          v-loading="loading"
          :empty-text="tableDesc"
          v-infinite-scroll="rollLoad"
          :infinite-scroll-disabled="disabled"
          infinite-scroll-immediate="false"
          class="el-scrollbar"
          style="width: 100%; height: 100%; overflow-y: auto;">
          <el-table-column>
            <template slot-scope="scope">
              <el-row>
                <el-col :span="24">
                  <div class="grid-content">
                    <!--<span class="title-tag" v-if="scope.row.state == 0 ">草稿</span>-->
                    <!--<span class="title-tag" v-if="scope.row.state == 1 && scope.row.top>0">置顶</span>-->
                    <el-tag type="info" v-if="state != 0 && scope.row.state == 0 ">草稿</el-tag>
                    <el-tag type="danger" v-if="state != 0 && scope.row.state == 2 ">私密</el-tag>
                    <el-tag type="warning" v-if="scope.row.state == 1 && scope.row.oncomment == 0">禁止评论</el-tag>
                    <el-tag type="success" v-if="scope.row.state == 1 && scope.row.top>0">置顶</el-tag>
                    <span class="grid-content-title" title="不可编辑" v-if="scope.row.state == 3">{{ scope.row.title }}</span>
                    <span class="grid-content-title" title="编辑" v-else @click="handleEdit(scope.row.id)">{{ scope.row.title }}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-summary">
                    <!--{{ scope.row.summary }}-->
                    {{ scope.$index }}
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <div class="grid-content-detail">
                    <ul class="detail-list" >
                      <li class="detail-list-item">
                        <span v-if="scope.row.typeName != ''">{{ scope.row.typeName }}</span>
                      </li>
                      <li class="detail-list-item">
                        {{ scope.row.createtime }}
                      </li>
                      <li class="detail-list-item" title="阅读">
                        <i class="icon-font el-icon-nblog-yueduliang"></i>{{ scope.row.readCount }}
                      </li>
                      <li class="detail-list-item" title="评论">
                        <i class="icon-font el-icon-nblog-pinglun"></i>{{ scope.row.commentCount }}
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content-operation">
                    <ul class="detail-list" >
                      <li class="detail-list-item">
                        <a href="javascript:;" class="item-btn" @click="blogView(scope.row)" heightNum="heightNum">查看</a>
                      </li>
                      <li class="detail-list-item" v-if="scope.row.state == 1">
                        <a href="javascript:;" class="item-btn" v-if="scope.row.oncomment >0" @click="stateClick(scope.row,'oncomment')">禁止评论</a>
                        <a href="javascript:;" class="item-btn" v-else @click="stateClick(scope.row,'oncomment')">允许评论</a>
                      </li>
                      <li class="detail-list-item" v-if="scope.row.state == 1 ">
                        <a href="javascript:;" class="item-btn" v-if="scope.row.top >0" @click="stateClick(scope.row,'top')">取消置顶</a>
                        <a href="javascript:;" class="item-btn" v-else @click="stateClick(scope.row,'top')">置顶</a>
                      </li>
                      <li class="detail-list-item">
                        <a href="javascript:;" class="item-btn" v-if="scope.row.state === 3"  @click="stateClick(scope.row,'recovery')">恢复至草稿箱</a>
                      </li>
                      <li class="detail-list-item">
                        <a href="javascript:;" class="item-btn-del" v-if="scope.row.state === 3"  @click="stateClick(scope.row,'delete')">彻底删除</a>
                        <a href="javascript:;" class="item-btn-del" v-else @click="stateClick(scope.row,'delete')">删除</a>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
              <el-row v-if="scope.$index === (tableData.length-1)">
                <el-col>
                  <p class="paga-tip" v-if="page.roll_loading"><i class="el-icon-loading"></i>加载中...</p>
                  <p class="paga-tip" v-if="noMore && page.isShow">没有更多了</p>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!--</el-scrollbar>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getRequest, postRequest} from '@/utils/api'
import {isNotNullORBlank} from '../utils/utils'
export default {
  data () {
    return {
      loading: false,
      tableDesc: '数据加载中···',
      page: {
        currentPage: 1,
        pageSize: 8,
        totle: 0,
        roll_loading: false,
        isShow: false
      },
      searchOpt: {
        keywords: '',
        typeValue: ''
      },
      typeOptions: [{
        value: '11',
        label: '原创'
      }, {
        value: '12',
        label: '转载'
      }, {
        value: '13',
        label: '翻译'
      }],
      tableData: []
    }
  },
  mounted: function () {
    this.loading = true
    this.loadBlogList(this.page.currentPage, this.page.pageSize, false)
    var _this = this
    window.bus.$on('blogTableReload', function () {
      _this.loading = true
      _this.loadBlogList(_this.page.currentPage, _this.page.pageSize, false)
    })
  },
  computed: {
    noMore () {
      this.tableData.length > this.page.pageSize ? this.page.isShow = true : this.page.isShow = false
      return this.tableData.length >= this.page.totle
    },
    disabled () {
      return this.page.roll_loading || this.noMore
    }
  },
  methods: {
    handleEdit (id) {
      this.$router.push({path: '/editBlog', query: {bid: id}})
    },
    searchClick () {
      this.loading = true
      this.page.currentPage = 1
      this.loadBlogList(this.page.currentPage, this.page.pageSize, false)
    },
    rollLoad () {
      let _this = this
      this.page.roll_loading = true
      setTimeout(() => {
        _this.loadBlogList(_this.page.currentPage + 1, _this.page.pageSize, true)
      }, 200)
    },
    loadBlogList (page, count, isAppend) {
      let url = '/blog/list?state=' + this.state + '&page=' + page + '&count=' + count + '&keywords=' + this.searchOpt.keywords + '&typeid=' + this.searchOpt.typeValue
      getRequest(url).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          // this.tableData = resp.data.reqData.blogs
          // this.tableData = Object.assign([], this.tableData, resp.data.reqData.blogs)
          this.page.totle = resp.data.reqData.totle
          if (isAppend) {
            this.tableData = this.tableData.concat(resp.data.reqData.blogs)
            this.page.roll_loading = false
          } else {
            this.tableData = resp.data.reqData.blogs
          }
          if (this.tableData.length === 0) {
            this.tableDesc = '暂无数据'
          }
        }
        this.loading = false
      }, resp => {
        this.$message.error('找不到服务器⊙﹏⊙∥!', '失败!')
        this.loading = false
        this.tableDesc = '暂无数据'
      })
    },
    blogView (row) {
      this.$router.push({path: '/BlogDetail', query: {bid: row.id}})
    },
    stateClick (row, opt) {
      let _this = this
      let status = -1
      let strConfirmDesc = '确认删除吗?'
      if (opt === 'top') {
        status = row.top
      } else if (opt === 'oncomment') {
        status = row.oncomment
      } else if (opt === 'delete') {
        if (row.state === 3) {
          strConfirmDesc = '确认彻底删除吗? 删除后将不能恢复!'
        } else {
          status = row.state
        }
      }
      if (opt === 'delete') {
        this.$confirm(strConfirmDesc, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          postRequest('/blog/setstatus', {
            bid: row.id,
            opt: opt,
            state: status
          }).then(resp => {
            if (resp.status === 200 && resp.data.code === 0) {
              _this.searchClick()
              _this.$emit('loadTip')
              _this.$message.success('删除成功', '成功')
            } else {
              // 失败
              _this.$message.error('删除失败!', '失败!')
            }
          }, resp => {
            _this.$message.error('找不到服务器⊙﹏⊙∥!', '失败!')
          })
        }, function () {
        })
      } else {
        postRequest('/blog/setstatus', {
          bid: row.id,
          opt: opt,
          state: status
        }).then(resp => {
          if (resp.status === 200 && resp.data.code === 0) {
            if (opt === 'top') {
              row.top = 1 - status
              this.searchClick()
            } else if (opt === 'oncomment') {
              row.oncomment = 1 - status
            }
            if (opt === 'recovery') {
              _this.searchClick()
              _this.$emit('loadTip')
            }
            _this.$message.success('操作成功', '成功')
          } else {
            // 失败
            _this.$message.error('操作失败!', '失败!')
          }
        }, resp => {
          _this.$message.error('找不到服务器⊙﹏⊙∥!', '失败!')
        })
      }
    }
  },
  props: ['state', 'heightNum']
}
</script>

<style scoped>
a{
  text-decoration: none;
}
.table-scrollbar{
  overflow-x: hidden;
  height: 100%;
}
.toolbar{
  min-width: 510px;
  padding: 20px 10px;
  background-color: rgba(232, 234, 236, 0.81);
  border-bottom: #EBEEF5 solid 1px;
  overflow-x: auto;
}
.toolbar .search-item{
  display: inline;
}
.data_warp{
  height: 670px;
  overflow: hidden;
}
.data_warp_min{
  height: 450px;
}
.data_warp .table-scrollbar{
  overflow-x: hidden;
  height: 100%;
}
.data_warp .table-scrollbar>>>.el-scrollbar__wrap{
  overflow-x: hidden;
}
.data_warp .paga-tip{
  text-align: center;
  font-size: 9px;
  color: #999;
}
.data_warp .el-table:before {
  height: 0;
}
.grid-content{
  line-height: 50px;
  vertical-align: middle;
}

.grid-summary{
  line-height: 30px;
  vertical-align: middle;
  padding-bottom: 5px;
}

.grid-content-title{
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  /*line-height: 40px;*/
}
.grid-content-title:hover{
  color: #409EFF;
}
.grid-content .title-tag{
  margin-right: 10px;
  padding:4px 8px;
  font-size: 12px;
  color: #999;
  border: #ddd solid 1px;
}
.grid-content .el-tag{
  margin-right: 10px;
  height: 27px;
  line-height: 26px;
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
