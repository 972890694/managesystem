<template>
  <div class="add">
    <el-alert class="title" title="添加商品信息" type="info" center show-icon></el-alert>

    <!-- 步骤条 -->
    <el-steps :active="+active" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 添加商品信息 -->
    <el-tabs v-model="active" tab-position="left" style="height: 200px;">
      <el-tab-pane label="基本信息" name="0">
        <el-form>
          <el-form-item label="商品名称">
            <el-input type="text"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input type="text"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :header="headers"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "addgoods",
  data() {
    return {
      active: 0,
      fileList: [],
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      }
    };
  },
  methods: {
    handlePreview(file) {
        console.log(file);
        window.open(file.url)
      
    },
    handleRemove() {
      console.log('这是什么');
      
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 20px 0 20px;
}
</style>
