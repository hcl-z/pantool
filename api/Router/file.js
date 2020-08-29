const express=require('express')
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/pantool';
const mongoose=require('mongoose')
var mongo=require('../db/conn').mongoose
var Grid = require('gridfs-stream');
let gfs;
mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', function() {
  console.log('success')
  gfs = Grid(mongo.db, mongoose.mongo);
});
// Create a storage object with a given configuration
const storage = new GridFsStorage({ url,cache:true,
    file: (req, file) => {
        return {filename:file.originalname}
    }
  });
 
// Set multer storage engine to the newly created object
const upload = multer({ storage });
var router=express.Router()

router.post('/upload',upload.single('file'),(req,res,next)=>{
    console.log(req.file)
})

router.get('/download',(req,res)=>{
    var readstream = gfs.createReadStream('29994113_0003_20181002-143224.png');
      console.log(readstream)
      res.setHeader('Content-Disposition','attachment')
      readstream.pipe(res)
})


module.exports=router