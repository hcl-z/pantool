var express = require('express')
var Session = require('express-session')
var cookie=require('cookie-parser')
var bodyParser=require('body-parser')
var sessionkey=require('./config').sessionkey
require('./db/conn.js')
var app = express()
var Validate=require('./Router/validate.js')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session中间件
app.use(Session({
    secret: sessionkey,
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie: { httpOnly: true,resave:true,maxAge:10000 }
  }))

//路由接口
app.use('/validate',Validate)

app.listen(3000,()=>{
    console.log('服务器已开启')
})