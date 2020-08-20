const express=require('express')
var User=require('../db/models/User')
var hashkey=require('../config').hashkey
const crypto = require('crypto');
var router=express.Router()

router.post('/login',async(req,res)=>{
    console.log(req.session.info)
    let {name,pass}=req.body
    let hash = crypto.createHash('sha1');
    hash.update(pass)
    pass=hash.digest('hex')
    try {
        var Userfind=await User.findOne({name:name,password:pass})
        
    } catch (error) {
        console.log(error)
        return res.send({code:0,message:error})
    }
    if(Userfind)
    {
        req.session.info=Userfind
        return res.send({code:1,message:'用户存在，允许登录'})
    } 
    return res.send({code:0,message:'用户名或密码错误'})
})
router.get('/',(req,res)=>{
    res.send(req.session.info)
})
router.post('/register',async(req,res)=>{
    let {name,pass,email}=req.body
    let hash = crypto.createHash('sha1');
    hash.update(pass)
    pass=hash.digest('hex')
    try {
        var Userfind=await User.findOne({name:name})
        if(Userfind) return res.send({code:0,message:'用户名已存在'})
        await User.insertMany({name:name,password:pass,email:email})
        res.send({code:1,message:'用户注册成功'})
    } catch (error) {
        console.log(error)
        return res.send({code:0,message:'err'})
    }
})

module.exports=router