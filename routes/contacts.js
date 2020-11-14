//Packages
const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');


// '/mainmenu/:user/contacts' => GET
router.get('/mainmenu/:user/contacts', (req, res, next) => {
    res.send('<h1> Your contacts motherfucker!! </h1>');
});


// '/mainmenu/:user/add-contact' => GET
router.get('/mainmenu/:user/add-contact', (req, res, next) => {
    res.render('addContact.ejs', {
        user: req.params.user
    });
});

// '/mainmenu/:user/add-contact' => POST

/* Construir los metodos POST para añadir contactos y ver contactos retocando los archivos .ejs */



module.exports = {
    contactsRouter: router
};


/**
 * I need to catch the data with submit buttons from mainmenu.ejs and show in this section.
 * Also needs to learn about cookies session
 */