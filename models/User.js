var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  phno: String,
  name: String,
  rollno: String,
  school: String,
  address: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;