<template>
  <div class="user">
    <crumbs :first="'用户管理'" :second="'用户列表'"></crumbs>

    <el-col :span="6">
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="success" plain>添加用户</el-button>
    </el-col>

    <!-- 表格 -->
    <grid></grid>

    <!-- 分页 -->
    <page></page>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>

