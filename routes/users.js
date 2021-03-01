var express = require('express');
var router = express.Router();

var User = require('../models/User');
var usersController = require('../controller/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getDetails', usersController.getDetails);

module.exports = router;
