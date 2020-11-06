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
    res.sendFile(path.join(rootDir, 'views', 'signin.html'));
});

router.post('/signin', [
    requireValidPasswordForUser,
    requireValidUserName
], async (req, res, next) => {

    const errors = validationResult(req); 

    if(!errors.isEmpty()){
        console.log(errors);
    }else {
        res.send('<h1> Estas loggeado!! <h1>');
    }
    
});

module.exports = {
    signinRouter: router
};