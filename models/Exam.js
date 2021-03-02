var mongoose = require('mongoose');  

var QuestionSchema = new mongoose.Schema({
  question_no: {
    type: Number,
    unique: true
  },
  question: String,
  options: [String],
  correct_ans_index: Number,
});

var ExamSchema = new mongoose.Schema({
  name: String,
  questions: [QuestionSchema],
  class: {
    type: String,
    enum: ['V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  },
  exam_type: {
    type: String,
    enum: ['topic', 'chapter', 'main'],
    required: true,
  },
  start_time: Number,
  end_time: Number
});

module.exports = mongoose.model('Exam', ExamSchema);