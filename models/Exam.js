var mongoose = require('mongoose');  

var QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct_answer: String,
  points: Number,
  time_limit: Number //Time limit in seconds
});

var ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    enum: ['V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
    required: true
  },
  type: {
    type: String,
    enum: ['topic', 'chapter', 'main'],
    required: true
  },
  questions: [QuestionSchema],
  instructions: [String],
  negative_marking: Number,
  start_time: Number,
  end_time: Number,
});

module.exports = mongoose.model('Exam', ExamSchema);