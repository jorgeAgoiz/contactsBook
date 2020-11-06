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
            res.sendFile(path.join(rootDir,'views', 'main.html'));
        }else {
            const userExists = await repo.getOne(inputUser);//Check if the email is bussy.
            if(userExists){//If email is bussy...
                res.sendFile(path.join(rootDir,'views', 'mainmenu.html')); 
            } else {
                // USERS REPOSITORY
                repo.create(inputUser, password1);//Call the method to create a new user     
             };
        };   
});

module.exports = { 
    signupRouter: router 
};


/* La idea es liarme con el SignIn, crear un validator para comprobar que el usuario no esta ocupado */