const express=require('express')
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/pantool';
const mongoose=require('mongoose')
var mongo=require('../db/conn').mongoose
var Grid = require('gridfs-stream');
var User=require('../db/models/User')
let gfs;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function() {
  console.log('success')
  gfs = Grid(mongo.db, mongoose.mongo);
  gfs.collection('fs')
});
// Create a storage object with a given configuration
const storage = new GridFsStorage({ url,
    file: (req, file) => {
        return {filename:file.originalname}
    }
  });
 
// Set multer storage engine to the newly created object
const upload = multer({ storage });
var router=express.Router()

router.post('/upload',upload.single('file'),(req,res,next)=>{
    let {_id}=req.session.info
    let id=req.file.id
    User.updateOne({_id:_id},{$push:{uploadFiles:id}})
    res.send({code:1,msg:'success'})
})

router.get('/download',(req,res)=>{
    var readstream = gfs.createReadStream('6.jpg');
      console.log(gfs.files)
      res.setHeader('Content-Disposition',"attachment;filename=startSession.mp4")
      readstream.pipe(res)
})
/* router.get('/test',(req,res)=>{
  res.send('dd')
}) */
router.get('/files',(req,res)=>{
  gfs.files.find().toArray((err,files)=>{
    if(err){
      return res.send({msg:'查询出错'})
    }
    return res.json(files)
  })
})
module.exports=router