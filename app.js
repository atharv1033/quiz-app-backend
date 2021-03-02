var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
global.__root = __dirname + '/';
var verifyToken = require('./middleware/verifyToken');

var adminRouter = require('./routes/admin');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var examRouter = require('./routes/exam');
var questionRouter = require('./routes/question');

var app = express();

mongoose.connect('mongodb+srv://quiz-app-server:mhbZI3ZuYZ6ddY74@cluster0.vhuil.mongodb.net/quizApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routers are set here -----------------

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.use(verifyToken); // Authenticate user before making requests to furthure routes

app.use('/user', userRouter);
app.use('/exam', examRouter);
app.use('/question', questionRouter);

//---------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('error', err.message);
});

module.exports = app;
