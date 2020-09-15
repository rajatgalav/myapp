const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const multer = require('multer');
const forms = multer()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogList = require('./routes/blogList');
const blogData = require('./routes/blogData');

const app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testdb',
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => console.log("mongoose is connected"))
.catch((err) => console.log("error", err)); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyparser.json())
app.use(forms.array())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog-list', blogList);
app.use('/blog-data', blogData);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
