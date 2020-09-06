const express=require('express')
var router=express.Router()

router.get('/status',(req,res)=>{
    return res.send({code:1,msg:'已登陆'})
})
module.exports=router