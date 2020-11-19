const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const repo = require('../repositories/usersRepo');
const {
    requireValidPasswordForUser,
    requireValidUserName
} = require('./validators');

const { body, validationResult } = require('express-validator');

// '/signin' => GET
router.get('/signin', (req, res, next) => {
    res.render('signin.ejs', {
        pageTitle: 'Contacts Book - Sign In'
    })
    //res.sendFile(path.join(rootDir, 'views', 'signin.html'));
});

// '/signin' => POST
router.post('/signin', [
    requireValidPasswordForUser,
    requireValidUserName
], async (req, res, next) => {
    
    const errors = validationResult(req); 

    if(!errors.isEmpty()){
        console.log(errors);
    }else {
        res.redirect(`/mainmenu/${req.body.inputUser}`);
    }
    
});

module.exports = {
    signinRouter: router
};