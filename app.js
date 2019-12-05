var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/group');
var userRouter = require('./routes/user');

//Set up connectivity to MongoDB
const mongoUrl = 'mongodb://localhost:27017/IOU';
mongoose.connect(mongoUrl, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
});

//Clean up the connection when cntrl+c is pressed
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log("Closing the mongodb connection");
    process.exit(0);
  });
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/group', groupRouter);
app.use('/api/user', userRouter);  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//catch invalid tokens
//TODO: redirect to login page where it no auth is checked. 
//Cause if this is the case there tokens got messed up
/*app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
   res.status(401).send('invalid tokenz...');
  }
});*/


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var listener = app.listen(8888, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

module.exports = app;
