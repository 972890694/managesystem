<template>
  <div class="params">
    <crumbs :first="'商品管理'" :second="'分类参数'"></crumbs>
    <el-alert class="alert" title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.alert {
    margin: 20px 0;
}
</style>

