//Packages
const path = require('path');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const contactRepo = require('../repositories/contactsRepo');
const { 
    requireValidEmail, 
    requireValidDate, 
    requireValidName, 
    requireValidLastName
 } = require('../routes/validators');


// '/mainmenu/:user/contacts' => GET
router.get('/mainmenu/:user/contacts', async (req, res, next) => {
    const userC = req.params.user;
    const resultContacts = await contactRepo.getContactsFrom(userC);

    res.render('myContacts.ejs', {
        contacts: resultContacts,
        pageTitle: "My Contacts"
    });
});

// '/mainmenu/:user/delete-contact' => POST
router.post('/mainmenu/:user/delete-contact', async (req, res, next) => {
    const contactId = req.body.idDelete;
    const userMenu = req.params.user;
    
    console.log(userMenu);

    const contactDel = await contactRepo.deleteOne(contactId);
    console.log(contactDel);

    res.redirect(`/mainmenu/${userMenu}/contacts`);//********* Check modal in bootstrap framework
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
        const newUser = await contactRepo.save(userName, nameC, lastName, birthday, phoneNumber, email);
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