var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../models/User');

router.post('/signin', (req, res) => {
    console.log(req.body.phno);
    User.findOne({
        phno: req.body.phno
    },
        (err, user) => {
            if (err) {
                console.log('Signin database error: ', err);
                return res.status(500).send('Error on server');
            }
            if (!user) {
                return res.status(404).send({
                    auth: false,
                    userFound: false,
                    message: 'User not found'
                });
            }

            let token = jwt.sign({ id: user._id }, config.secret);

            res.status(200).send({
                auth: true,
                userFound: true,
                token: token
            });

        });

});

router.post('/signup', (req, res) => {
    console.log(req.body.phno);
    User.create({
        phno: req.body.phno
    },
        (err, user) => {
            if (err) {
                console.log('Signup database error: ', err);
                return res.status(500).send("Problem registering new user");
            }

            let token = jwt.sign({ id: user._id }, config.secret);

            res.status(200).send({
                auth: true,
                token: token
            });

        });
});

module.exports = router;