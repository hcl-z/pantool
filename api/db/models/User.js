var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    name:'String',
    password:'String',
    email:'String',
    date: { type: Date, default: Date.now },
    uploadFiles:'Array'
  });

  var User = mongoose.model('User', UserSchema);

  module.exports=User;