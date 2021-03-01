var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
  phno: {
    type: String,
    required: true,
    unique: true,
    maxLength: 12,
    minLength: 12
  },
  name: String,
  rollno: String,
  school_name: String,
  address: String,
  pincode: Number,
  city: String,
  state: String
});

module.exports = mongoose.model('User', UserSchema);