'use strict';

var express = require('express');
var router = express.Router();
var User   = require('../models/user');
var jwt    = require('jsonwebtoken');
var config = require('../config');


router.post('/authenticate', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign(user, config.secret, { expiresIn: config.expiresIn });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});



router.post('/account/logout', function(req, res) {
  res.json({});
});


module.exports = router;
