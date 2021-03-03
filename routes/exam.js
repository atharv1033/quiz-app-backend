var express = require('express');
var router = express.Router();

var examController = require('../controller/examController');

router.get('/chapterWise', examController.getChapterWiseExams);
router.get('/topicWise', examController.getTopicWiseExams);
router.get('/main', examController.getMainExams);

module.exports = router;