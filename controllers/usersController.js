const User = require('../models/user');
const TOKEN_FOR_USERS_CREATION = 'hjDHKMRQrDkKRZ7QnX8x';
const { checkPasswordsForEquality } = require('../helpers');
const { createToken, deleteToken } = require('./tokensController');

module.exports = {
    create: (req, res, next) => {
        const { username, password } = req.body;
        const token = req.query.token;
        User.find({ username }, (err, user) => {
            if (user.length !== 0) {
                res.status(400).send("The user with mentioned username already exists");
            } else if (!username || !password) {
                res.status(400).send("Missing Required Fields");
            } else if (token !== TOKEN_FOR_USERS_CREATION) {
                res.status(401).send("Failed to authenticate");
            } else {
                const newUser = new User({
                    username,
                    password
                });
                newUser.save((err, user) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send('User created successfully');
                    }
                })
            }
        });
    },
    getAllUsers: (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log('everything is ok');
                res.json(users);
            }
        })
    },
    login: (req, res) => {
        console.log(req.body);
        const { username, password } = req.body;
        User.findOne({ username }, (err, user) => {
            if (err || !user) {
                console.log('stexa')
                console.log(username);
                res.status(404).send("Can't find user with specified username");
            } else {
                checkPasswordsForEquality(password, user.password)
                    .then(passIsCorrect => {
                        if (passIsCorrect) {
                            createToken(user)
                                .then(token => {
                                    console.log('everything is ok')
                                    res.json({ token: token._id });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        msg: "Can't properly log in"
                                    });
                                })
                        }
                    })
                    .catch(err => {
                        res.status(404).send(err);
                    })
            }
        })
    },
    logout: (req, res) => {
        const { token } = req.headers;
        if (token) {
            deleteToken(token)
                .then(success => {
                    if (success) {
                        res.send("User logged out");
                    }
                })
                .catch(err => {
                    res.status(500).send("Can't logout the user");
                })
        } else {
            res.status(401).send("No token specified");
        }
    }
}