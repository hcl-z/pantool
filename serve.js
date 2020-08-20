const express=require('express')
const path=require('path')
var formidable = require('formidable')
var bodyParser = require('body-parser')
let app=express()
const fs=require('fs')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  var upload = multer({ storage: storage,limits:{fileSize:20 * 1024 * 1024} })

app.use(express.static(path.join(__dirname,'./img')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser({uploadDir:'./img'}))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header('Content-Type','application/x-msdownload')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
app.get('/',(req,res)=>{
    res.header('Content-Type','application/x-msdownload')
})
app.post('/file',(req,res)=>{
    const form = new formidable.IncomingForm();
    form.uploadDir =__dirname+"/img"
    form.keepExtensions = true;//保存扩展名
    form.maxFieldsSize = 20 * 1024 * 1024;//上传文件的最大大小
    form.parse(req, (err, fields, files) => {
        if(err) throw err;
            console.log(files);
            
            res.send('表单提交成功！');
    })
})
app.post('/fileload',upload.any(),(err,req,res,next)=>{
    console.log(req.files)
    if(err){
        res.send(err)
    }else{
        next()
    }
    },(req,res)=>{
        res.send('success')
    })
app.listen(3030,()=>{
    console.log('running')
})