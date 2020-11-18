//Packages
const path = require('path');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const contactsRepo = require('../repositories/contactsRepo');
const { 
    requireValidEmail, 
    requireValidDate, 
    requireValidName, 
    requireValidLastName
 } = require('../routes/validators');


// '/mainmenu/:user/contacts' => GET
router.get('/mainmenu/:user/contacts', (req, res, next) => {
    res.send('<h1> Your contacts motherfucker!! </h1>');
});


// '/mainmenu/:user/add-contact' => GET
router.get('/mainmenu/:user/add-contact', (req, res, next) => {
    res.render('addContact.ejs', {
        user: req.params.user,
        pageTitle: "Add A Contact"
    });
});

// '/mainmenu/:user/add-contact' => POST
router.post('/mainmenu/add-contact', [
    requireValidEmail, 
    requireValidDate, 
    requireValidName, 
    requireValidLastName
], async (req, res, next) => {

    const errors = validationResult(req); 

    if(!errors.isEmpty()){
        console.log(errors);
    } else {
        const { nameC, lastName, birthday, phoneNumber, email, userName } = req.body;
        const newUser = await contactsRepo.save(userName, nameC, lastName, birthday, phoneNumber, email);
        console.log(newUser);
    }



});
/* Construir los metodos POST para añadir contactos y ver contactos retocando los archivos .ejs
Acabod de solucionar el problema con los validator, estaba usando isEmpty en vez de notEmpty
*/



module.exports = {
    contactsRouter: router
};


/**
 * I need to catch the data with submit buttons from mainmenu.ejs and show in this section.
 * Also needs to learn about cookies session
 */