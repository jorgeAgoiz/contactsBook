// PACKAGES
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const crypto = require('crypto');
const util = require('util');
//To convert this callback function in a promise function with util.promisify
const scrypt = util.promisify(crypto.scrypt);


// VALIDATORS
const {
    requireValidPasswordForUser,
    requireValidUserName
} = require('./validators');
const { body, validationResult } = require('express-validator');
// MODEL REPOSITORY
const User = require('../repositories/users');
//const repo = require('../repositories/usersRepo');

// '/signin' => GET
router.get('/signin', (req, res, next) => {
    res.render('signin.ejs', {
        pageTitle: 'Contacts Book - Sign In'
    })
});

// '/signin' => POST
router.post('/signin', [
    requireValidPasswordForUser,
    requireValidUserName
], async (req, res, next) => {

    const errors = validationResult(req);
    const uName = req.body.inputUser;
    const pass = req.body.password1;

    if (!errors.isEmpty()) {
        console.log(errors);
        res.redirect('/signin');
    } else {
        const theUser = await User.findOne({ where: { username: uName } })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
        /* TO ENCRYPT THE PASSWORD AND COMPARE WITH THE DB PASSWORD */
        const [hashed, salt] = theUser.password.split('.');
        const hashedSuppliedBuf = await scrypt(pass, salt, 64);
        if (hashed === hashedSuppliedBuf.toString('hex')) {
            req.session.userId = theUser.id;
            res.redirect(`/mainmenu/${theUser.username}`);
        } else {
            res.redirect('/signin');
            console.log('User not found');
        }
    };
});

module.exports = {
    signinRouter: router
};