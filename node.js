var cookieSession = require('cookie-session')
var bodyParser=require('body-parser')
var express = require('express')
 
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.set('trust proxy', 1) // trust first proxy
 
app.use(cookieSession({
  name: 'sd',
  keys: ['key1', 'key2']
}))
 
app.post('/login',(req,res)=>{
    let info=req.body.info;
    req.session.INFO=info;
    res.send('nihao')
})
app.post('/content',(req,res)=>{
    console.log(req.session.INFO)
})
app.listen(3000,()=>{
    console.log('s')
})