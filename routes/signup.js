//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

const {
    requireValidUser,
    requireValidPassword,
    requirePasswordConfirmation
} = require('./validators');

const repo = require('../repositories/usersRepo');
const { body, validationResult } = require('express-validator');

// '/signup' => GET
router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views', 'signup.html'));
});
// '/signup' => POST
router.post('/signup', [
    requireValidUser,
    requireValidPassword,
    requirePasswordConfirmation
    ], async (req, res) => {

        const {inputUser, password1, password2} = req.body;
        const errors = validationResult(req);  

        if (!errors.isEmpty()) {
            //return res.status(400).json({ errors: errors.array() });
            console.log(errors);
            res.redirect(200, `/signup`);
        }else {
            const userExists = await repo.getOne(inputUser);//Check if the email is bussy.
            if(userExists){//If email is bussy...
                res.redirect(200, `/signup`);
            } else {
                // USERS REPOSITORY
                repo.create(inputUser, password1);//Call the method to create a new user
                res.redirect(`/mainmenu/${inputUser}`);    
             };
        };   
});

module.exports = { 
    signupRouter: router 
};