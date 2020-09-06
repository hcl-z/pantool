var express = require('express')
var Session = require('express-session')
var cookie=require('cookie-parser')
var bodyParser=require('body-parser')
var sessionkey=require('./config').sessionkey
var app = express()
var Validate=require('./Router/validate.js')
var Fun=require('./Router/fun.js')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:8080");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Credentials",true);
  
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
     res.send(200); //让options尝试请求快速结束
  else
     next();
})

//session中间件
app.use(Session({
    secret: sessionkey,
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie: { httpOnly: true,resave:true,maxAge:3600*12 }
  }))
app.use((req,res,next)=>{
  next()
})
//路由接口
app.use('/validate',Validate)
app.use('/fun',Fun)


app.listen(3000,()=>{
    console.log('服务器已开启')
})