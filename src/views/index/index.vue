<template>
  <div class="index">
    <el-container>
      <el-header class="header">
        <h1 class="login">
          <a href="javascript:(voied)">
            <img src="../../assets/images/logo.png" alt />
          </a>
        </h1>
        <div class="title">后台管理系统</div>
        <div class="sign_in">
          <a href="javascript:void(0)" @click="open">退出</a>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            :router="true"
          >
            <el-submenu v-for="(item,index) in menuList" :key="index" :index="index.toString()">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                v-for="(list,idx) in item.children"
                :key="idx"
                class="el-icon-menu"
                :index="list.path"
              >{{ list.authName }}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { http } from "../../api/http.js";
export default {
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    open() {
        this.$confirm('是否要退出系统？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          // 退出登录成功 跳转到 登录组件
          this.$router.push('/login')
          // 清除浏览器缓存 token 
          sessionStorage.clear('token')

          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })
      }
  },
  mounted() {
    http.$get("menus").then(backData => {
      if (backData.data.meta.status === 200) {
        this.menuList = backData.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  .header {
    height: 30px;
    width: 100%;
    background-color: rgb(179, 192, 209);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 24px;
      color: #fff;
    }
    .sign_in {
      a {
        color: orange;
      }
    }
  }
  .el-container {
    height: 100%;
    .aside {
      width: 20%;
      height: 100%;
      background-color: #fff;
    }
    .main {
      width: 70%;
      height: 100%;
      padding-top: 0;
      background-color: rgb(233, 238, 243);
    }
  }
}
</style>

