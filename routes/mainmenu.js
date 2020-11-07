//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/mainmenu/:user', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'mainmenu.html'));
    const userName = req.params.user;
    console.log(userName);   
});

/* Implementemos los metodos del menu principal */

module.exports = {
    menuRouter: router
};