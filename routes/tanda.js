'use strict';

var express = require('express');
var router = express.Router();
var Tanda   = require('../models/tanda');

router.get('/', function(req, res) {
  Tanda.find({}, function(err, tandas) {
    res.json({"tandas" : tandas});
  });
});

router.post('/', function(req, res) {
  var tanda = new Tanda({
    name      : req.body.name,
    mount     : req.body.mount,
    startDate : req.body.startDate,
    period    : req.body.period,
    _creator  : req.decoded._id,
  });
  tanda.save(function(err){
    if (err) throw err;
    res.json(tanda);
  });
});

module.exports = router;
