<template>
  <div>
    <el-form v-model="info">
      <el-row type="flex" align="middle">
        <el-col :span="16" :offset="4">
          <el-form-item>
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
          <el-form-item>
            <el-input show-password placeholder="密码" v-model="info.pass">
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-row type="flex" align="middle" id="forget">
      <el-col type="flex" justify="center">
        <el-link type="info" icon="el-icon-edit">忘记密码？</el-link>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col>
        <el-button type="primary" round @click="$emit('login',info)">login</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        name: "",
        pass: "",
      },
    };
  },
  
};
</script>

<style lang="less">
.el-row {
  .el-button {
    width: 70%;
    margin-top: 20px;
  }
}

#forget {
  margin-bottom: 0px;
}
</style>