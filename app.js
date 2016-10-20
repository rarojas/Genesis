'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var products = require('./routes/products');
var users = require('./routes/users');
var auth = require('./routes/auth');
var account = require('./routes/account');
var tandas = require('./routes/tanda');



var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model

var mongo = require('mongodb');
var monk = require('monk');
var mongoose = require('mongoose');
mongoose.connect(config.database);
var db = monk('localhost:27017/genesis');
var app = express();


app.set('superSecret', config.secret); // secret variable
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var secureRoutes = express.Router();

secureRoutes.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['authorization'];
  if (token) {
    jwt.verify(token.replace('Bearer ',''), app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.headers['if-none-match'] = 'no-match-for-this';
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});


app.use('/', routes);
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api', auth);
app.use('/api/secure',secureRoutes);
app.use('/api', account);
app.use('/api/secure/tanda',tandas);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


module.exports = app;
