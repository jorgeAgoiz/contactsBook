const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

// '/signup' => GET
router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(rootDir,'views', 'signup.html'));
});
// '/signup' => POST
router.post('/signup', (req, res, next) => {
    console.log(req.body);
});

module.exports = { 
    signupRouter: router 
};
