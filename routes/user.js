var express = require('express');
var router = express.Router();

var User = require('../models/User');
var userController = require('../controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/details', userController.getUserDetails);

module.exports = router;
