var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/pantool',{ useNewUrlParser: true,useUnifiedTopology: true });

exports.mongoose=mongoose.connection