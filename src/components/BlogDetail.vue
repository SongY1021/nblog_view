<template>
  <div>
  <el-row>
    <el-col :span="24" class="detail-toolbar">
      <div style="text-align: left;">
        <el-button type="text" icon="icon-font el-icon-nblog-ai207" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
      </div>
    </el-col>
    <el-col :span="24" >
      <el-col :span="24">
        <div class="detail-content">
          <span v-if="blog.typeid == 11"><el-tag type="" effect="plain">原</el-tag></span>
          <span v-else-if="blog.typeid == 12"><el-tag type="success" effect="plain">转</el-tag></span>
          <span v-else-if="blog.typeid == 13"><el-tag type="warning" effect="plain">译</el-tag></span>
          <span class="detail-content-title">
                <h2 style="margin-top: 0px;margin-bottom: 0px">{{blog.title}}</h2>
              </span>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="detail-content-detail">
          <ul class="detail-list" >
            <li class="detail-list-item">
              <span class="title-tag" v-if="blog.state == 1 && blog.top>0">置顶</span>
            </li>
            <li class="detail-list-item">
              <span class="title-tag" v-if="blog.state == 2" style="color:#F56C6C;">私密</span>
            </li>
            <li class="detail-list-item">
              <a href="javascript:;" class="item-btn" >{{ blog.username }}</a>
            </li>
            <li class="detail-list-item">
              {{ blog.modifytime }}
            </li>
            <li class="detail-list-item" title="阅读">
              阅读数&nbsp;{{ blog.readCount }}
            </li>
            <li class="detail-list-item" >
              <el-tag type="success" v-for="(item,index) in blog.tags" :key="index" size="small"
                      style="margin-right: 10px">
                {{item.name}}
              </el-tag>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="detail-content-operation">
          <ul class="detail-list" >
            <li class="detail-list-item">
              <a href="javascript:;" @click="handleEdit(blog)" class="item-btn" >编辑</a>
            </li>
          </ul>
        </div>
      </el-col>
    </el-col>
    <el-col>
      <el-divider></el-divider>
    </el-col>
  </el-row>
  <el-row v-loading="loading" class="data_warp" v-bind:style="{ height: heightNum }">
    <el-scrollbar class="detail-scrollbar">
      <el-col class="data_content">
        <div style="text-align: left" v-html="blog.htmlContent"></div>
      </el-col>
    </el-scrollbar>
  </el-row>
  </div>
</template>
<script>
import {getRequest} from '../utils/api'
export default{
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    handleEdit (blog) {
      this.$router.push({path: '/editBlog', query: {blog: blog}})
    }
  },
  mounted: function () {
    let bid = this.$route.query.bid
    var _this = this
    this.loading = true
    getRequest('/blog/' + bid).then(resp => {
      if (resp.status === 200 && resp.data.code === 0) {
        _this.blog = resp.data.reqData
      }
      _this.loading = false
    }, resp => {
      _this.loading = false
      _this.$message({type: 'error', message: '页面加载失败!'})
    })
    this.heightNum = (window.innerHeight - 340) + 'px'
  },
  data () {
    return {
      blog: {},
      heightNum: '625px',
      loading: false,
      activeName: ''
    }
  }
}
</script>
<style>
  a{
    text-decoration: none;
  }
  .data_warp{
    height: 625px;
    overflow-x: hidden;
  }
  .data_warp_min{
    height: 405px;
  }
  .data_warp .data_content{
    height: 100%;
  }
  .data_warp .detail-scrollbar{
    height: 100%;
    overflow-x: hidden;
  }
  .data_warp .detail-scrollbar>>>.el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .data_warp .detail-scrollbar .el-scrollbar__bar{
    right:0;
  }
  .detail-toolbar{
    padding-bottom: 20px;
  }
  .detail-content{
    line-height: 50px;
    vertical-align: middle;
  }

  .detail-content-title{
    display: inline-block;
    font-size: 20px;
    /*line-height: 40px;*/
  }
  .detail-content .title-tag{
    margin-right: 10px;
    padding:4px 8px;
    font-size: 12px;
    color: #999;
    border: #ddd solid 1px;
  }
  .detail-content-detail,.detail-content-operation{
    line-height: 24px;
    font-size: 13px;
    color: #999;
  }
  .detail-content-operation{
    float: right;
  }
  .detail-content-detail .detail-list,.detail-content-operation .detail-list{
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
  .detail-content-detail .detail-list-item, .detail-content-operation .detail-list-item{
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
  .detail-content .el-tag{
    padding: 0 6px;
    height: 29px;
    line-height: 27px;
    font-size: 15px;
    font-weight: bold;
    vertical-align: super;
    border-radius: 17px;
  }
</style>
