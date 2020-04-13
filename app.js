var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var rootIndex = require('./routes/root_index')
var rootGestionIndividus = require('./routes/root_gestion_individus')
var rootTracking = require('./routes/root_tracking')
var rootServiceCom = require('./routes/root_service_com')
var rootServiceMapping = require('./routes/root_service_mapping')

var app = express();

// view engine setup
app.engine('ejs', require('express-ejs-extend'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/root/index', rootIndex);
app.use('/root/gestion_individus', rootGestionIndividus);
app.use('/root/tracking', rootTracking);
app.use('/root/service_com', rootServiceCom);
app.use('/root/service_mapping', rootServiceMapping);

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
