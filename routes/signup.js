//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
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
        .withMessage('Must be between 5 and 20 characters'),
    ], (req, res) => {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                //return res.status(400).json({ errors: errors.array() });
                console.log(errors);
            }else{
                console.log(req.body); 
            }
            
    
});

module.exports = { 
    signupRouter: router 
};
