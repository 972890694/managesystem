<template>
  <div>
    <crumbs :first="'权限管理'" :second="'角色列表'"></crumbs>
    <el-button @click="dialogFormVisibleAdd = true">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(tag,index) in scope.row.children" :key="index">
            <!-- 一级菜单 -->
            <el-col :span="6">
              <el-tag closable @close="delRole(scope.row,tag)">{{tag.authName}}</el-tag>
            </el-col>

            <el-col :span="18">
              <!-- 二级菜单 -->
              <el-row v-for="(level2,index) in tag.children" :key="index">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="delRole(scope.row,level2)"
                  >{{ level2.authName }}</el-tag>
                </el-col>
                <!-- 三级菜单 -->
                <el-col :span="18">
                  <el-tag
                    class="tag"
                    closable
                    type="warning"
                    v-for="(level3,index) in level2.children"
                    :key="index"
                    @close="delRole(scope.row,level3)"
                  >{{ level3.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            class="is-plain"
            @click.native="editRoles(scope.row.id)"
            type="primary"
            size="mini"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            class="is-plain"
            @click.native="delRoles(scope.row.id)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            class="is-plain"
            @click.native="assignRoles(scope.row)"
            type="warning"
            size="mini"
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="addData" ref="formEdit" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addData.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="editData" ref="formEdit" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editData.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="updataRoles">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限分配 -->
    <el-dialog title="权限分配" :visible.sync="dialogFormVisibleRight">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedKeys"
        ref="tree"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="rolesRight">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  name: "roles",
  data() {
    return {
      // 从后台获取到的数据
      tableData: [],
      // 添加的模态框
      dialogFormVisibleAdd: false,
      // 添加的角色信息
      addData: {},

      // 编辑的模态框
      dialogFormVisibleEdit: false,
      // 通过id获取到的编辑的数据
      editData: {},

      // 权限分配
      dialogFormVisibleRight: false,
      // 权限分配选中的数组
      checkedKeys: [],

      // 角色id
      roleId: null,
      rids: [],

      rules: {
        roleName: [
          { required: true, message: "请输入角色名字", trigger: "blur" },
          { min: 2, message: `用户名最少2位`, trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 3, message: `用户名最少3位`, trigger: "blur" }
        ]
      },

      data: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  methods: {
    // 增加角色提交
    addRoles() {
      http.$post(`roles`, this.addData).then(backData => {
        if (backData.data.meta.status == 201) {
          this.dialogFormVisibleAdd = false;

          this.$message.success("添加成功");

          this.getRoles();
        }
      });
    },

    // 编辑角色
    editRoles(id) {
      this.dialogFormVisibleEdit = true;

      http.$get(`roles/${id}`).then(backData => {
        this.editData = backData.data.data;
      });
    },
    // 编辑角色提交
    updataRoles() {
      http
        .put(`roles/${this.editData.roleId}`, {
          roleName: this.editData.roleName,
          roleDesc: this.editData.roleDesc
        })
        .then(backData => {
          if (backData.data.meta.status == 200) {
            this.dialogFormVisibleEdit = false;

            this.$message.success("更新成功");

            this.getRoles();
          }
        });
    },

    // 删除角色
    delRoles(id) {
      if (id == 30) {
        return this.$message({
          type: "error",
          message: "禁止删除主管"
        });
      }

      this.$confirm("确认删除该角色吗", "提示", {
        confirmButtonText: "确定",

        cancelButtonText: "取消",

        type: "warning"
      })
        .then(() => {
          http.delete(`roles/${id}`).then(backData => {
            if (backData.data.meta.status == 200) {
              this.$message.success("删除成功");

              this.getRoles();
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

    // 显示权限分配模态框
    assignRoles(row) {
      this.roleId = row.id;

      this.dialogFormVisibleRight = true;
      // 先保存一下之前的数据， 不能直接赋值保存，存的是同样一个地址，清空也没用，所有使用concat生成一个新的数组
      let temp = this.data.concat();
      // 清空原先的数组
      this.data = [];
      // 恢复原来的数组
      this.data = temp;
      let list = [];
      this.checkedKeys = list;

      // 循环出每一个id添加到数组中
      if (row.children) {
        row.children.forEach(v => {
          if (v.children) {
            v.children.forEach(item => {
              if (item.children) {
                item.children.forEach(items => {
                  list.push(items.id);
                });
              }
            });
          }
        });
      }
    },
    // 提交权限分配
    rolesRight() {
      this.dialogFormVisibleRight = false;

      // 获取到所有选中的权限id
      let keys = this.$refs.tree.getCheckedKeys();
      // 拿到所有半选择的权限id
      let halfKeys = this.$refs.tree.getHalfCheckedKeys();

      let rids = keys.concat(halfKeys).toString();

      http
        .$post(`roles/${this.roleId}/rights`, {
          rids
        })
        .then(backData => {
          if (backData.data.meta.status == 200) {
            this.getRoles();
          }
        });
    },

    // 发送请求获取角色列表
    getRoles() {
      http.$get(`roles`).then(v => {
        if (v.data.meta.status == 200) {
          this.tableData = v.data.data;
        }
      });
    },

    // 发请求获取树形权限
    getRolesTree() {
      http.$get(`rights/tree`).then(backData => {
        if (backData.data.meta.status == 200) {
          this.data = backData.data.data;
        }
      });
    }
  },
  created() {
    this.getRoles();
    this.getRolesTree();
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
.tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>

