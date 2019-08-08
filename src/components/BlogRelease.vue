<template>
  <div>
    <el-row class="title">
      <el-col :span="24">
        <el-input
          placeholder="请输入文章标题, 最少5个字最多50个字"
          prefix-icon="el-icon-edit"
          minlength="5"
          maxlength="50"
          class="input-item"
          v-model="blog.title">
          <el-select v-model="blog.typeid" slot="prepend" placeholder="文章类型" clearable style="width: 140px;">
            <el-option
              v-for="item in typeOptions"
              :key="item.typeid"
              :label="item.label"
              :value="item.typeid">
            </el-option>
          </el-select>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="24" >
        <mavon-editor v-bind:style="{ height: heightNum }" ref=md v-model="blog.mdContent" class="editor" aria-placeholder></mavon-editor>
      </el-col>
    </el-row>
    <el-row class="attr">
      <el-col :span="2" class="label">
        文章标签:
      </el-col>
      <el-col :span="22" class="tags">
        <el-tag
          :key="tag"
          v-for="tag in blog.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag.name)">
          {{tag.name}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button type="text" icon="icon-font el-icon-nblog-tianjia-f" v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
      </el-col>
      <el-col :span="2" class="label">
        发布类型:
      </el-col>
      <el-col :span="22" class="tags radio">
        <el-radio-group v-model="state">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">私密</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="release-toolbar">
        <el-button plain icon="icon-font el-icon-nblog-baocun">保存为草稿</el-button>
        <el-button type="primary" icon="icon-font el-icon-nblog-fasong">发布博客</el-button>
        <el-button type="danger" icon="icon-font el-icon-nblog-fanhui1" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default{
  data () {
    return {
      strState: 1,
      heightNum: '400px',
      blog: {
        typeid: '',
        title: '',
        tags: [],
        mdContent: ''
      },
      typeOptions: [{
        typeid: '11',
        label: '原创'
      }, {
        typeid: '12',
        label: '转载'
      }, {
        typeid: '13',
        label: '翻译'
      }],
      inputVisible: false,
      inputValue: ''
    }
  },
  components: {
    mavonEditor
  },
  mounted: function () {
    this.heightNum = (window.innerHeight - 470) + 'px'
    let blogP = this.$route.query.blog
    let _this = this
    if (_this.isNotEmpty(blogP)) {
      _this.blog = blogP
    }
  },
  methods: {
    isNotEmpty (obj) {
      if (obj != null && obj != '' && obj != undefined) {
        return true
      }
      return false
    },
    goBack () {
      this.$router.go(-1)
    },
    handleClose (tag) {
      this.blog.tags.splice(this.blog.tags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.blog.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style>
  .title{
    min-width: 510px;
    padding: 15px 10px;
    background-color: rgba(232, 234, 236, 0.81);
    /*border-bottom: #EBEEF5 solid 1px;*/
    overflow-x: auto;
  }
  .title .search-item{
    display: inline;
  }
  .title .input-item {
    width: 100%;
  }
  .title .el-input__inner{
    height:46px;
    line-height: 46px;
    font-size: initial;
  }
  .title .el-input__icon{
    line-height: 46px;
    font-size: initial;
  }
  .title .el-input-group__append, .title .el-input-group__prepend{
    background-color: #FFFFFF;
  }
  .content{
    background-color: rgba(232, 234, 236, 0.81);
    padding: 0 10px;
  }
  .content .v-note-wrapper {
    /*min-height: 400px;*/
  }
  .content .editor{
    /*min-height: 500px;*/
  }
  .content .v-note-wrapper .v-note-op.shadow{
    box-shadow: none;
    border: rgba(52, 69, 86, 0.21) solid 1px;
  }
  .content .v-note-wrapper .v-note-panel.shadow{
    box-shadow: none;
    border: rgba(47, 64, 80, 0.21) solid 1px;
    border-top: none;
  }
  .attr{
    background-color: rgba(232, 234, 236, 0.81);
    padding: 15px 10px;
  }
  .attr .label{
    padding:5px 0;
    line-height: 48px;
    height: 50px;
    color: #575757;
    padding-left: 4px;
  }
  .attr .tags{
    padding:5px 0;
    line-height: 48px;
    height: 50px;
  }
  .attr .button-new-tag {
    font-size: 14px;
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .attr .button-new-tag span{
    line-height: 30px;
    display: inline-flex;
    vertical-align: middle;
    letter-spacing: 2px;
  }
  .attr .icon-font {
    line-height: 30px;
    vertical-align: middle;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .attr .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: middle;
  }
  .attr .radio{
    padding-left: 10px;
  }
  .release-toolbar{
    background-color: rgba(232, 234, 236, 0.81);
    padding: 30px 10px 20px;
  }
  .release-toolbar .el-button{
    height:50px;
    font-size: 15px;
    padding: 12px 26px;
  }
</style>
