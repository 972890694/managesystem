<template>
  <div>
    <crumbs :first="'权限管理'" :second="'权限列表'"></crumbs>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="200px"></el-table-column>
      <el-table-column prop="path" label="路径" width="200px"></el-table-column>
      <el-table-column prop="level" label="层级" width="200px"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {},
  created() {
    http.$get(`rights/list`).then(backData => {
      if (backData.data.meta.status == 200) {
        let dengJi = backData.data.data;
        dengJi.forEach(v => {
          switch (v.level) {
            case '0':
              v.level = '一级'
              break
            case '1':
              v.level = '二级'
              break
            case '2':
              v.level = '三级'
              break
          }
        });

        this.tableData = backData.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
</style>

