<template>
  <div class="BlogRelaase">
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
              :key=item.typeid
              :label="item.label"
              :value=item.typeid>
            </el-option>
          </el-select>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content" >
      <el-col :span="24" >
        <div class="editor" v-bind:style="{ height: heightNum }">
          <mavon-editor style="width: 100%; height: 100%;" ref=md v-model="blog.mdContent" v-on:change="autoSave" @imgAdd="imgAdd" class="editor" aria-placeholder></mavon-editor>
        </div>
      </el-col>
    </el-row>
    <el-row class="attr" v-loading="loading">
      <el-col :span="2" class="label">
        文章标签:
      </el-col>
      <el-col :span="22" class="tags">
        <el-tag
          :key="tag"
          v-for="tag in blog.tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
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
        <el-radio-group v-model="r_state">
          <el-radio :label="1">公开</el-radio>
          <el-radio :label="2">私密</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="release-toolbar">
        <el-button plain icon="icon-font el-icon-nblog-baocun" v-if="blog.state == 0" @click="saveBlog(0)">保存为草稿</el-button>
        <el-button type="primary" icon="icon-font el-icon-nblog-fasong" @click="saveBlog()">发布博客</el-button>
        <el-button type="danger" icon="icon-font el-icon-nblog-fanhui1" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getRequest, postRequest, uploadFileRequest} from '@/utils/api'
import {mavonEditor} from 'mavon-editor'
import {isNotNullORBlank} from '../utils/utils'
import 'mavon-editor/dist/css/index.css'
export default{
  data () {
    return {
      loading: false,
      heightNum: '400px',
      r_state: 1,
      isAutoSave: true,
      localTime: new Date().toTimeString().substr(0, 8),
      blog: {
        id: '',
        typeid: '',
        title: '',
        state: 0,
        tags: [],
        mdContent: ''
      },
      typeOptions: [{
        typeid: 11,
        label: '原创'
      }, {
        typeid: 12,
        label: '转载'
      }, {
        typeid: 13,
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
    let bid = this.$route.query.bid
    let _this = this
    if (isNotNullORBlank(blogP)) {
      _this.blog = blogP
      blogP.state === 0 ? _this.r_state = 1 : _this.r_state = blogP.state
    }
    if (isNotNullORBlank(bid)) {
      _this.loadBlog(bid)
      _this.blog.id = bid
    }
  },
  methods: {
    loadBlog (bid) {
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
    },
    imgAdd (pos, $file) {
      var _this = this
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      uploadFileRequest('/blog/uploadimg', formdata).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          _this.$refs.md.$imglst2Url([[pos, resp.data.reqData.imgPath]])
        } else {
          _this.$message({type: resp.data.code, message: resp.data.msg})
        }
      })
    },
    saveBlog (s) {
      if (!this.checkForm()) {
        return
      }
      let blogState = this.r_state
      if (isNotNullORBlank(s)) {
        blogState = 0
      }
      let _this = this
      _this.loading = true
      postRequest('/blog/', {
        id: _this.blog.id,
        title: _this.blog.title,
        typeid: _this.blog.typeid,
        state: blogState,
        mdContent: _this.blog.mdContent,
        htmlContent: _this.$refs.md.d_render,
        tags: _this.blog.tags
      }).then(resp => {
        _this.loading = false
        if (resp.status === 200 && resp.data.code === 0) {
          _this.$message({type: 'success', message: blogState === 0 ? '保存成功!' : '发布成功!'})
          window.bus.$emit('blogTableReload')
          if (blogState != 0) {
            _this.$router.replace({path: '/BlogList'})
          }
        }
      }, resp => {
        _this.loading = false
        _this.$message({type: 'error', message: blogState === 0 ? '保存草稿失败!' : '博客发布失败!'})
      })
    },
    checkForm () {
      let _this = this
      if (!isNotNullORBlank(_this.blog.typeid)) {
        _this.$message.error('文章类型不能为空!')
        return false
      } else if (!isNotNullORBlank(_this.blog.title)) {
        _this.$message.error('标题不能为空!')
        return false
      } else if (_this.blog.title.length < 5 || _this.blog.title.length > 50) {
        _this.$message.error('标题按长度在5-50个字之间!')
        return false
      } else if (!isNotNullORBlank(_this.blog.mdContent)) {
        _this.$message.error('文章内容不能为空!')
        return false
      } else if (!isNotNullORBlank(_this.blog.mdContent)) {
        _this.$message.error('文章内容不能为空!')
        return false
      }
      return true
    },
    autoSave () {
      setTimeout(() => {
        if (this.isAutoSave) {
          this.isAutoSave = false
          this.$notify({
            dangerouslyUseHTMLString: true,
            position: 'bottom-right',
            // message: h ('i',{ style: 'color: teal'}, '文章保存成功，时间:' + new Date().toTimeString().substr(0, 8)),
            message: '<strong style="color: teal">文章保存成功，当前时间: ' + this.localTime + '</strong>',
            offset: 100,
            showClose: false,
            duration: 0,
            onClose: () => {
              this.isAutoSave = true
              console.info('关闭了')
            }
          })
        }
      }, 5000)
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
  }
  .content .editor{
    min-height: 280px;
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
  .BlogRelaase .content .add-image-link{
    min-width: 540px;
  }
  .BlogRelaase .content .add-image-link .title{
    min-width: 460px;
  }
</style>
