var mongoose = require('mongoose');  

var ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class_name: {
    type: String,
    enum: ['V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
    required: true
  },
  exam_type: {
    type: String,
    enum: ['topic', 'chapter', 'main'],
    required: true
  },
  start_time: Number,
  end_time: Number,
});

module.exports = mongoose.model('Exam', ExamSchema);