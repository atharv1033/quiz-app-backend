var User = require('../models/User')

let usersController = {};

usersController.getDetails = (req, res) => {
    User.findOne({
        _id: req.userId
    },
    (err, user) => {
        if(err) {
            console.log('Error in getDetails: ', err);
            res.status(500).send({
                userFound: false,
                message: 'Server error'
            });
        }
        if(!user) {
            res.status(404).send({
                userFound: false,
                message: 'User not found'
            });
        }

        res.status(200).send({
            userFound: true,
            userDetails: user
        });

    });
}

module.exports = usersController;