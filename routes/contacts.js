//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

router.post('/mainmenu/contacts', (req, res, next) => {
    res.send('<h1> Your contacts motherfucker!! </h1>');
});





module.exports = {
    contactsRouter: router
};


/**
 * I need to catch the data with submit buttons from mainmenu.ejs and show in this section.
 * Also needs to learn about cookies session
 */