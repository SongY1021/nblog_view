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
          v-model="blogTitle">
          <el-select v-model="typeValue" slot="prepend" placeholder="文章类型" clearable style="width: 140px;">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="24" >
        <mavon-editor style="height: 100%;width: 100%;" ref=md v-model="blog.mdContent" class="editor"></mavon-editor>
      </el-col>
    </el-row>
    <el-row class="attr">
      <el-col :span="24" class="tags">
        标签类别...
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="toolbar">
        操作
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
      typeValue: '',
      blogTitle: '',
      blog: {
        mdContent: ''
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
      }]
    }
  },
  components: {
    mavonEditor
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
  .content{
    background-color: rgba(232, 234, 236, 0.81);
    padding: 0 10px;
  }
  .content .v-note-wrapper {
    min-height: 400px;
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
</style>
