var mongoose = require('mongoose');  

var Answers = new mongoose.Schema({
    quiestion_id: String,
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
  Answers: [Answers],
  score: Number,
  last_response: Number
});

module.exports = mongoose.model('Answersheet', AnswersheetSchema);