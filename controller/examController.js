var Exam = require('../models/Exam');

var examController = {};

examController.getChapterWiseExams = async (req, res) => {

    let className = req.query.className;
    let chapterWiseExams = await Exam.find({
        exam_type: 'chapter',
        class: className
    }).exec();
    console.log('Chapter Wise Exams: ',chapterWiseExams);
    res.send(chapterWiseExams);

};

examController.getTopicWiseExams = async (req, res) => {
    let className = req.query.className;
    let topicWiseExams = await Exam.find({
        exam_type: 'topic',
        class: className
    }).exec();
    console.log('Topic Wise Exams: ', topicWiseExams);
    res.send(topicWiseExams);
};

examController.getMainExams = async (req, res) => {
    let className = req.query.className;
    let mainExams = await Exam.find({
        exam_type: 'main',
        class: className
    }).exec();
    console.log('Topic Wise Exams: ', mainExams);
    res.send(mainExams);
};

module.exports = examController;