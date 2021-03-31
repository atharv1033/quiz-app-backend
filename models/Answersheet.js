var mongoose = require('mongoose');  

var AnswersSchema = new mongoose.Schema({
    response: String,
    result: Boolean
});

var AnswersheetSchema = new mongoose.Schema({
  user_id: {
      type: String,
      index: true,
      required: true
  },
  exam_id: {
    type: String,
    index: true,
    required: true
  },
  answers: [AnswersSchema],
  score: Number,
  last_response: Number
});

module.exports = mongoose.model('Answersheet', AnswersheetSchema);