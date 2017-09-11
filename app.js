var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var config = require('./config/config');

// database
mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

var projects = require('./routes/projects');
var notes = require('./routes/notes');
var settings = require('./routes/settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// before request hook for theme
app.use('/*', function(req, res, next) {
  if (!settings.theme) {
    fs.readFile('./config/user_settings', 'utf8', function (err, data) {
      if (err) throw err;
      var s = data.split('\n');
      for (i in s) { setting = s[i].split(':');
        if (setting[0] == 'theme') {
          settings.theme = setting[1];
          break;
        }
      }
      app.locals.theme = settings.theme;
      next();
    });
  } else {
    app.locals.theme = settings.theme;
    next();
  }
});

app.use('/', projects);
app.use('/notes', notes);
app.use('/settings', settings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
