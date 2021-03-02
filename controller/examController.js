var Exam = require('../models/Exam');

var examController = {};

examController.getExamsChapterWise = (req, res) => {
    let className = req.query.className;

};

examController.getExamsTopicWise = (req, res) => {
    let className = req.query.className;
    
};

module.exports = examController;