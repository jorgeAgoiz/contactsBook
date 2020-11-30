//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
// MODEL REPOSITORY
const User = require('../repositories/users');

// '/mainmenu/:user' => GET
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

// '/signout' => GET
router.get('/signout', (req, res, next) => {
    req.session = null;
    res.redirect('/');
});

module.exports = {
    menuRouter: router
};