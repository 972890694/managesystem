<template>
  <div class="goodsIndex">
    <el-col :span="6">
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="success" plain @click="$router.push(`/goods/add`)">添加用户</el-button>
    </el-col>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500px"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）" width="120px"></el-table-column>
      <el-table-column prop="goods_number" label="商品重置" width="80px"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="160px"></el-table-column>
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            class="is-plain"
            @click.native="editUser(scope.row.id)"
            type="primary"
            size="mini"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            class="is-plain"
            @click.native="delData(scope.row.id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { http } from "../../../../api/http";
export default {
  data() {
    return {
      tableData: [],
      currentPage: null,
      total: null,
      sendData: {
        query: null,
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    handleSizeChange(page) {
      console.log(page);
      this.sendData.pagesize = page;
      this.getGoods();
    },
    handleCurrentChange(page) {
      console.log(page);
      this.sendData.pagenum = page;
      this.getGoods();
    },
    getGoods() {
      http.$get(`goods`, this.sendData).then(backData => {
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data.goods;

          this.total = backData.data.data.total;
        }
      });
    }
  },
  created() {
    this.getGoods();
  }
};
</script>


<style>
</style>
