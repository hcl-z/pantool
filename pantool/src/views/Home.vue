<template>
  <div class="home_content">
    <el-popover placement="right" width="200" trigger="hover" class="upload_card">
      <el-tabs>
        <el-tab-pane label="上传管理">
          <div v-show="uploadfilelist.length==0" style="text-align:center">暂无上传任务</div>
          <div
            v-for="file in uploadfilelist"
            :key="file.name"
            @mouseover="file.raw=true"
            @mouseout="file.raw=false"
          >
            <span>
              <i class="el-icon-close" v-show="file.raw==true" @click="$refs.upload.abort(file)"></i>
            </span>
            <span>
              {{file.name}}
              <el-progress :percentage="Math.ceil(file.percentage)" :color="customColors"></el-progress>
            </span>
          </div>
          <div style="text-align:center;margin-top:20px;" v-show="uploadfilelist.length>0">
            <i class="el-icon-close" @click="clear"></i>
          </div>
        </el-tab-pane>

        <el-tab-pane label="下载管理">
          <div v-show="downloadfilelist.length==0" style="text-align:center">暂无下载任务</div>
          <div v-for="file in downloadfilelist" :key="file.name">
            {{file.name}}
            <el-progress :percentage="file.percentage" :color="customColors"></el-progress>
          </div>
          <div style="text-align:center;margin-top:20px;" v-show="downloadfilelist.length>0">
            <i class="el-icon-close" @click="clear"></i>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-button
        v-show="uploadfilelist.length>=0"
        type="primary"
        icon="el-icon-upload2"
        circle
        class="upload_button"
        slot="reference"
      ></el-button>
    </el-popover>
    <div class="main">
      <el-upload
        drag
        name="file"
        :with-credentials=true
        action="http://localhost:3000/fun/file/upload"
        multiple
        ref="upload"
        class="resource"
        :show-file-list="false"
        :on-success="success"
        :on-change="change"
      >
        <i class="el-icon-upload" style="font-size:10em"></i>
      </el-upload>
      <div class="upload">2</div>
      <div class="manage">3</div>
      <div class="sharein">4</div>
      <div class="shareout">33sssss</div>
      <div class="login">
        <img v-if='isLogin' src="../assets/default.svg" alt="">
        <img v-else src="../assets/head.svg" alt="" @click='goLogin'>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
export default {
  data() {
    return {
      file: "",
      value: "http://localhost:3000/",
      filedata: [],
      isLogin:false,
      isupload: false,
      uploadfilelist: [],
      downloadfilelist: [],
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
    };
  },
  created(){
      this.$http.get('/fun/user/status')
      .then(res=>{
        console.log(res)
        if(res.data.code==1){
          this.isLogin=true
        }
      })
    },
  components: { QrcodeVue },
  methods: {
    choose(e) {
      this.file = e.target.files[0];
    },
    upload() {
      let formdata = new FormData();
      formdata.append("file", this.file);
      console.log(formdata);
      this.$http.post("/fun/file/upload", formdata).then((res) => {
        console.log(res);
      });
    },
    success(res, file, filelist) {},
    change(file, filelist) {
      this.uploadfilelist = filelist;
    },
    clear() {
      let res = this.uploadfilelist.filter((file) => {
        return file.status == "uploading";
      });
      this.uploadfilelist = res;
    },
    goLogin(){
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less">
.home_content {
  height: 100%;
  position: relative;
  .upload_button {
    position: fixed;
    top: 20px;
    left: 10px;
    font-size: 35px;
  }

  .main {
    width: 70%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 20px;
    .resource {
      background: white;
      grid-column: span 2;
      grid-row: span 2;
      overflow: hidden;
    }
    .upload {
      background: blue;
    }
    .manage {
      background: wheat;
    }
    .sharein {
      background: yellow;
    }
    .shareout {
      background: whitesmoke;
    }
    .login {
      background: rgb(163, 159, 159);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
