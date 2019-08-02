<template>
  <el-table :data="tableData" style="width: 100%" :border="true">
    <el-table-column type="index"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="mg_state" label="用户状态"></el-table-column>
    <el-table-column prop="operation" label="操作"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['tableData'],
  data() {
    return {
    };
  },
};
</script>

<style>
</style>
