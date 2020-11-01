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
        .trim(),
    body('password1')
        .isLength({min: 5, max: 12}),
    body('password2')
        .isLength({min: 5, max: 12})
    ], (req, res) => {

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            console.log(req.body);
    
});

module.exports = { 
    signupRouter: router 
};
