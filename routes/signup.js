//Packages
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
    requireValidUser,
    requireValidPassword,
    requirePasswordConfirmation
} = require('./validators');
const { body, validationResult } = require('express-validator');

// MODEL REPOSITORY
const User = require('../repositories/users');
//const repo = require('../repositories/usersRepo');

// '/signup' => GET
router.get('/signup', (req, res, next) => {
    res.render('signup.ejs', {
        pageTitle: 'Contacts Book - Sign Up', 
        errors: null
    });
});

// '/signup' => POST
router.post('/signup', [
    requireValidUser,
    requireValidPassword,
    requirePasswordConfirmation
    ], async (req, res) => {

        const {inputUser, password1, password2} = req.body;
        const errors = validationResult(req);
        //To encrypt the password
        const salt = await crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(password1, salt, 64);
        
        if (!errors.isEmpty()) {       
            console.log(errors);
            res.redirect('/signup');
        }else {
            User.create({
                username: inputUser,
                password: `${buf.toString('hex')}.${salt}`
                })
                .then( result => {
                    req.session.userId = result.id;
                    res.redirect(`/mainmenu/${inputUser}`);   
                })
                .catch( err => {
                    console.log(err);
                    res.redirect(200, `/signup`);
                });
        };   
});

module.exports = { 
    signupRouter: router 
};