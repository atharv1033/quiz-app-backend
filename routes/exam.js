var express = require('express');
var router = express.Router();

var examController = require('../controller/examController');

router.get('/getExams', examController.getExams);
router.post('/register', examController.registerForExam);

router.get('/question', examController.getQuestion);
router.post('/answer', examController.setAnswer);

module.exports = router;