var Exam = require('../models/Exam');
var Answersheet = require('../models/Answersheet');

var examController = {};

examController.getExams = async (req, res) => {

    let examsArray = await Exam.find({
        type: req.query.type,
        class: req.query.class
    },
        'name class type instructions negative_marking start_time end_time'
    ).exec();

    console.log('Exams Array: ', req.query.class, ' ', req.query.type, ' wise ', examsArray);
    res.send(examsArray);

};

examController.registerForExam = (req, res) => {

    Answersheet.create({
        user_id: req.userId,
        exam_id: req.body.exam_id
    },
        (err, doc) => {
            if (err) {
                console.log("Error registering user for exam");
                res.send({
                    registered: false,
                    message: "User registration for exam failed"
                });
            }

            console.log("User registered for exam", doc._id);
            res.send({
                registered: true,
                message: "User successfully registered for exam"
            });

        });
};


examController.getQuestion = async (req, res) => {

    let exam = await Exam.findById(req.query.exam_id).exec();
    let answersheets = await Answersheet.find({ user_id: req.userId, exam_id: req.query.exam_id }).exec();

    if (answersheets.length > 0 && exam) {
        let answersheet = answersheets[0];

        if (answersheet.answers) {

            if ((answersheet.answers).length === (exam.questions).length) {

                res.send({
                    complete: true
                });

            } else {

                let index_num = (answersheet.answers).length;
                let question = exam.questions[index_num];

                res.send({
                    complete: false,
                    question_num: index_num,
                    question: question
                });
            }
        } else {
            let question = exam.questions[0];

                res.send({
                    complete: false,
                    question_num: 0,
                    question: question
                });
        }
    }



};

examController.setAnswer = async (req, res) => {
    res.send('got your answer');
};

module.exports = examController;