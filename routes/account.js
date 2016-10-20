var express = require('express');
var router = express.Router();
var User   = require('../models/user');


router.get('/secure/account/profile/me', function(req, res) {
  User.findOne({
    name: req.decoded._doc.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Error on find user' });
    } else
     if (user) {
        res.json(user);
      }
    });
});



router.post('/account/register', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      var user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      user.save(function(err){
        if (err) throw err;
        res.json(user);
      });
    } else if (user) {
      res.json({ success: false, message: 'El usuario ya existe' });
    }
  });
});


module.exports = router;
