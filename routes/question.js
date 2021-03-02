var express = require('express');
var router = express.Router();

var questionController = require('../controller/questionController');

router.get('/', questionController.getQuestion);

module.exports = router;