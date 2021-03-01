var mongoose = require('mongoose');  

var ClassSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      unique: true
  }
});

module.exports = mongoose.model('Class', ClassSchema);