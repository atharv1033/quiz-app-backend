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
    let answersheet = await Answersheet.findOne({ user_id: req.userId, exam_id: req.query.exam_id }).exec();

    let currentTime = (new Date()).getTime();

    if (!answersheet || exam.start_time > currentTime || exam.end_time < currentTime) {
        res.send({
            message: 'test time expired or test not begun or you are not registered'
        });
        return;
    }

    let index_num = 0;
    let ansArray = [];
    if (answersheet.answers) {
        index_num = (answersheet.answers).length;
        ansArray = answersheet.answers;
        console.log(ansArray)
        if ((answersheet.answers).length === (exam.questions).length) {
            res.send({
                complete: true,
                message: "no. of questions finished"
            });
            return;
        }
    }

    ansArray.push({
        response: "",
        result: true
    });
    
    Answersheet.updateOne({ _id: answersheet._id }, { last_response: currentTime, answers: ansArray }).exec();

    let question = exam.questions[index_num];
    let questionObj = {
        question: question.question,
        options: question.options,
        points: question.points,
        time_limit: question.time_limit //Time limit in seconds
    };

    res.send({
        complete: false,
        question_num: index_num,
        question: questionObj
    });
    return;

};

examController.setAnswer = async (req, res) => {

    let exam = await Exam.findById(req.body.exam_id).exec();
    let answersheet = await Answersheet.findOne({ user_id: req.userId, exam_id: req.body.exam_id }).exec();
    let answer = req.body.answer;

    let currentTime = (new Date()).getTime();

    if (!answersheet || exam.start_time > currentTime || exam.end_time < currentTime) {
        res.send({
            message: 'test time expired or test not begun or you are not registered'
        });
        return;
    }

    let index_num = 0;
    let ansArray = [];
    if (answersheet.answers) {
     
        ansArray = answersheet.answers;
        ansArray.pop();
        console.log('here', ansArray);
        index_num = (ansArray).length;

    }

    let question = exam.questions[index_num];

    if (currentTime > answersheet.last_response + ((question.time_limit) * 1000)) {
        res.send({
            complete: false,
            message: 'question time limit expired'
        });
        return;
    }
    if (question.correct_answer === answer) {
        ansArray.push({
            response: answer,
            result: true
        });

        let score = 0;
        if (answersheet.score) { score = answersheet.score }

        Answersheet.updateOne({ _id: answersheet._id }, { answers: ansArray, score: score + question.points }).exec();

    } else {
        ansArray.push({
            response: answer,
            result: false
        });

        let negative_marks = 0;
        if (exam.negative_marking) { negative_marks = exam.negative_marking; }
        let score = 0;
        if (answersheet.score) { score = answersheet.score }

        Answersheet.updateOne({ _id: answersheet._id }, { answers: ansArray, score: score - negative_marks }).exec();

    }

    let complete = false;
    if((answersheet.answers).length === (exam.questions).length) { complete = true; }

    res.send({
        answer_received: true,
        message: 'Answer received',
        complete: complete
        
    });
    return;
};

module.exports = examController;


