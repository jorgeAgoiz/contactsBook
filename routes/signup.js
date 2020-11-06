//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

const repo = require('../repositories/usersRepo');

const { body, validationResult } = require('express-validator');

// '/signup' => GET
router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views', 'signup.html'));
});
// '/signup' => POST
router.post('/signup', [
    body('inputUser')
        .trim()
        .notEmpty()
        .withMessage('Must be a valid user'),
    body('password1')
        .trim()
        .isLength({min: 5, max: 20})
        .withMessage('Must be between 5 and 20 characters'),
    body('password2')
        .trim()
        .isLength({min: 5, max: 20})
        .withMessage('Must be between 5 and 20 characters')
        .custom((password2, { req }) => {
            if(password2 !== req.body.password1){
                throw new Error('Passwords must match.');   
            }
            return true;
        })
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
        }   

});

module.exports = { 
    signupRouter: router 
};


/* Implementar del todo el metodo de compare passwords y hacer un hash del password */