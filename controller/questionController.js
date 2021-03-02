var Question = require('../models/Question');

var questionController = {};

questionController.getQuestion = (req, res) => {
res.status(200).send('question?');
}

module.exports = questionController;