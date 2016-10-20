'use strict';

var express = require('express');
var router = express.Router();
var Tanda   = require('../models/tanda');

router.get('/', function(req, res) {
  Tanda.find({}, function(err, tandas) {
    res.json({"tandas" : tandas});
  });
});

module.exports = router;
