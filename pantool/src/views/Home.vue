<template>
  <div>
    <input type="file" @change='choose($event)'>
    <button @click='upload'>submit</button>
    <a href="http://localhost:3000/file/download">download</a>
    <QrcodeVue :value="value" :size='200' level='H' background='#ff0' foreground='#ff00ff' ></QrcodeVue>'
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  data() {
    return {
      file:'',
      value:'http://localhost:3000'
    }
  },
  components:{QrcodeVue},
  methods: {
    choose(e){
      this.file=e.target.files[0];
    },
    upload(){
      let formdata=new FormData()
      formdata.append('file',this.file)
      console.log(formdata)
      this.$http.post('/file/upload',formdata).then(res=>{
        console.log(res)
      })
    },
    
  },
}
</script>

<style lang="less">
  
</style>
