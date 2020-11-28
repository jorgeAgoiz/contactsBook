//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const User = require('../repositories/users');

router.get('/mainmenu/:user', async (req, res, next) => {
    await User.findOne({ where: { username: req.params.user }})
            .then( result => {
                res.render('mainmenu.ejs', {
                    pageTitle: 'My Contacts Book', 
                    user: result.username,
                    userId: result.id
                });
            })
            .catch( err => {
                console.log(err);
                res.redirect(`/mainmenu/${req.params.user}`);
            });
});

router.get('/signout', (req, res, next) => {
    req.session = null;
    res.redirect('/');
});

/* Implementemos los metodos del menu principal */

module.exports = {
    menuRouter: router
};