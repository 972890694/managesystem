<template>
  <div class="user">
    <crumbs :first="'用户管理'" :second="'用户列表'"></crumbs>

    <el-col :span="6">
      <el-input
        placeholder="请输入内容"
        v-model.trim="searchValue"
        @keyup.enter.native="search"
        clearable
      >
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-button type="success" plain @click="dialogFormVisibleAdd = true">添加用户</el-button>
    </el-col>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="80px">
        <template slot-scope="scope">
          <el-switch
            @change="changeStatus(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
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
          <el-button
            class="is-plain"
            @click.native="assignUser(scope.row.id)"
            type="warning"
            size="mini"
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增页 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form
        :model="formAdd"
        :rules="rules"
        ref="formAdd"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formAdd.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formAdd.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formAdd.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formAdd.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitFormAdd('formAdd')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="formEdit" ref="formEdit" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="editData.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitFormEdit('formEdit')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleAssign">
      <el-form :model="formAssign">
        <el-form-item label="当前用户">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;{{ formAssign.username }}</span>
        </el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="rid">
            <el-option label="请选择角色" :value="-1" disabled></el-option>
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAssign = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      searchValue: "",

      sendData: {
        query: null,
        pagenum: 1,
        pagesize: 5
      },
      total: null,

      dialogFormVisibleAdd: false,
      formAdd: {},

      dialogFormVisibleEdit: false,
      formEdit: {},
      editData: {},

      dialogFormVisibleAssign: false,
      formAssign: {},
      rid: '',
      
      rolesList: [],

      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          { min: 5, message: `用户名最少5位`, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最少6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSizeChange(page) {
      this.sendData.pagesize = page;

      this.getUsers();
    },
    handleCurrentChange(page) {
      this.sendData.pagenum = page;

      this.getUsers();
    },
    search() {
      this.sendData.query = this.searchValue;

      this.getUsers();
    },
    // 封装 请求 users 的方法
    getUsers() {
      http.$get("/users", this.sendData).then(backData => {
        
        this.tableData = backData.data.data.users;

        this.total = backData.data.data.total;
      });
    },
    // 新增的请求
    submitFormAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.$post("users", this.formAdd).then(backData => {
            if (backData.data.meta.status == 201) {
              this.$message.success(backData.data.meta.msg);

              // 隐藏模态框
              this.dialogFormVisibleAdd = false;

              this.getUsers();
            } else {
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 状态改变发送的请求
    changeStatus(id, type) {
      http.put(`users/${id}/state/${type}`).then(backData => {
        if (backData.data.meta.status == 200) {
          this.$message({
            message: "设置用户状态成功",
            type: "success"
          });
        } else {
          this.$message.error(backData.data.meta.msg);
        }
      });
    },
    // 编辑角色发送的请求
    editUser(id) {
      this.dialogFormVisibleEdit = true;

      http.$get(`users/${id}`).then(backData => {
        this.editData = backData.data.data;
      });
    },
    // 提交角色修改发送的请求
    submitFormEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http
            .put(`users/${this.editData.id}`, {
              email: this.editData.email,
              mobile: this.editData.mobile
            })
            .then(backData => {
              if (backData.data.meta.status == 200) {
                this.$message.success("更新成功");

                this.dialogFormVisibleEdit = false;

                this.getUsers();
                // this.editData.email = this.formEdit.email
                // this.editData.mobile = this.formEdit.mobile
              }
            });
        } else {
          return false;
        }
      });
    },

    // 删除用户
    delData(id) {
      this.$confirm("确认要删除该用户么？", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning"
      })
        .then(() => {
          http.delete(`users/${id}`).then(backData => {
            if (backData.data.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });

              this.getUsers();
            } else {
              this.$message({
                type: "error",
                message: backData.data.meta.msg
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分配角色
    assignUser(id) {
      // 显示模态框
      this.dialogFormVisibleAssign = true;
      
      http.$get(`users/${id}`)
          .then(v => {
            console.log(v);
            this.rid = v.data.data.rid;
            this.formAssign.username = v.data.data.username
          })
    },

    getRoles() {
      http.$get(`roles`)
          .then(v => {;
            this.rolesList = v.data.data
          })
    },
    // 分配用户角色发送请求
    updateRole() {

    }
  },
  created() {
    this.getUsers();
    this.getRoles();
  },
  watch: {
    searchValue() {
      if (this.searchValue === "" && this.searchValue.length === 0) {
        this.getUsers();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.el-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
.el-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}
</style>

