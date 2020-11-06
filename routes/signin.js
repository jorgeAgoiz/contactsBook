const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

// '/signin' => GET
router.get('/signin', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'signin.html'));
});

router.post('/signin', (req, res, next) => {
    
});

module.exports = {
    signinRouter: router
};