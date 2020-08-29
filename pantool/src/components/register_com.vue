<template>
  <div>
    <el-form :model="info" :rules="rules" ref="ruleForm">
      <el-row type="flex" align="middle">
        <el-col :span="16" :offset="4">
          <el-form-item prop="name">
            <el-input placeholder="用户名" v-model="info.name">
              <template slot="prepend">
                <i class="el-icon-user-solid"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" align="middle">
        <el-col :span="16" :offset="4">
          <el-form-item prop="pass">
            <el-input type="password" placeholder="密码" v-model="info.pass">
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" align="middle">
        <el-col :span="16" :offset="4">
          <el-form-item prop="repass">
            <el-input type="password" placeholder="确认密码" v-model="info.repass">
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" align="middle">
        <el-col :span="16" :offset="4">
          <el-form-item prop="email">
            <el-input placeholder="邮箱" v-model="info.email" style='letter-spacing:1px;'>
              <template slot="prepend">
                <i class="el-icon-message"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row type="flex" justify="center">
      <el-col>
        <el-button type="primary" round @click="submitForm">register</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var repassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.info.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      info: {
        name: "",
        pass: "",
        repass: "",
        email: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 7, message: "长度在 3 到 7 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        repass: [{ validator: repassCheck, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "change" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('register',this.info)
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  .el-button {
    width: 70%;
    margin-top: 20px;
  }
}
</style>