var express = require('express');
var router = express.Router();

var examController = require('../controller/examController');

router.get('/chapterWise', examController.getExamsChapterWise);
router.get('/topicWise', examController.getExamsTopicWise);

module.exports = router;