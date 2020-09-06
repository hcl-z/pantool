const express=require('express')
var router=express.Router()
var FileFunc=require('./file')
var UserFunc=require('./user')

router.use((req,res,next)=>{
    if(req.session.info){
        next()
    }else if(req.path='/user/status'){
        res.send({code:0,msg:'用户未登录'})
    }else{
        res.send({code:-1,msg:'登录状态无效'})
    }
})
router.use('/file',FileFunc)
router.use('/user',UserFunc)
module.exports=router