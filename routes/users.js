'use strict';

var express = require('express');
var router = express.Router();
var User   = require('../models/user');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;
