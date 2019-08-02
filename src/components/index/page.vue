<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage4"
    :page-sizes="[10, 20]"
    :page-size="50"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
  ></el-pagination>
</template>

<script>
export default {
    data() {
        return {
            currentPage4: 1
        }
    },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style>
</style>
