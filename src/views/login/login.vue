<template>
  <div class="login">
    <div class="from">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <h1 class="title">用户登录</h1>
        <el-form-item label="用户名" @keyup.enter.native="submitForm('ruleForm')" prop="username">
          <el-input type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" @keyup.enter.native="submitForm('ruleForm')" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          { min: 5, message: `密码最少5位`, trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最少6位", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          http.login(this.ruleForm).then(backData => {
            if (backData.data.meta.status == 200) {
              this.$message.success(backData.data.meta.msg);

              // 将 token 保存起来
              sessionStorage.setItem("token", backData.data.data.token);

              this.$router.push(`/index`);
            } else {
              this.$message.error(backData.data.meta.msg);
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .from {
    padding: 40px;
    width: 580px;
    height: 336px;
    background-color: #fff;
    border-radius: 10px;
    .title {
      margin-bottom: 30px;
    }
    .submit {
      width: 100%;
    }
  }
}
</style>
