<template>
  <div class="login_content">
    <div class="card">
      <el-row>
        <el-col>
          <el-menu
            @select="select"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="activeIndex"
            mode="horizontal"
          >
            <el-menu-item index="0">登录</el-menu-item>
            <el-menu-item index="1">注册</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <component :is='currentCom' class='card_main' @login='doLogin' @register='doRegister'></component>
    </div>
  </div>
</template>
<script>
import Login from '../components/login_com.vue'
import Register from '../components/register_com.vue'
export default {
  data() {
    return {
      activeIndex: "0",
    };
  },
  components:{Login,Register},
  methods: {
    select(i) {
      this.activeIndex = i;
    },
    doLogin(x){
      this.$http.post('/validate/login',x)
      .then(res=>{
        if(res.data.code==1) this.$router.push('/home')
      })
    },
    doRegister(x){
      console.log(x)
    }
  },
  computed: {
    currentCom(){
      return this.activeIndex==0?'Login':'Register'
    }
  },
};
</script>

<style lang="less" scoped>
.login_content {
  position: relative;
  height: 100%;
  background:url('../assets/bg.jpg') no-repeat center center;
  background-size: cover;
  .card {
    position: absolute;
    box-shadow: 5px 5px 5px rgb(143, 145, 141), -5px -5px 5px rgb(215, 216, 213);
    top: 50%;
    left: 50%;
    width: 400px;
    overflow: hidden;
    transform: translate(-50%, -50%);
    border-radius: 30px;
    .el-menu {
        .el-menu-item {
          width: 50%;
        }
      }
    .card_main{
      padding:20px;
    }
  }
}
</style>