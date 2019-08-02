<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
    <el-breadcrumb-item :to="{ path: '/' }" class="text">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ first }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ second }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["first", "second"]
};
</script>

<style lang="less" scoped>
.title {
  height: 45px;
  line-height: 45px;
  padding-left: 10px;
  background-color: #d3dce6;
}
</style>

