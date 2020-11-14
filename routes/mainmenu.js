//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/mainmenu/:user', (req, res, next) => {
    res.render('mainmenu.ejs', {
        pageTitle: 'My Contacts Book', 
        user: req.params.user
    });
    
    const userName = req.params.user;   
});

/* Implementemos los metodos del menu principal */

module.exports = {
    menuRouter: router
};