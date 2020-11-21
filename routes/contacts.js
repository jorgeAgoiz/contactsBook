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
        pageTitle: "My Contacts",
        user: userC
    });
});

// '/mainmenu/:user/delete-contact' => POST
router.post('/mainmenu/:user/delete-contact', async (req, res, next) => {
    const contactId = req.body.idDelete;
    const userMenu = req.params.user;

    const contactDel = await contactRepo.deleteOne(contactId);

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
    const { nameC, lastName, birthday, phoneNumber, email, userName } = req.body;

    if(!errors.isEmpty()){
        console.log(errors);
    } else {
        const newUser = await contactRepo.save(userName, nameC, lastName, birthday, phoneNumber, email);
    }
    res.redirect(`/mainmenu/${userName}`);
});

// '/mainmenu/:user/edit-contact/:idEdit' => 'GET'
router.get('/mainmenu/:user/edit-contact/:idEdit', async (req, res, next) => {
    
    const idContact = req.params.idEdit; 
    const userContact = req.params.user;
    
    const contactEdit = await contactRepo.findOne(idContact);

    res.render('editContact.ejs', {
        pageTitle: 'Edit Contact',
        contact: contactEdit,
        user: userContact
    });
});

// '/mainmenu/:user/edit-contact/:idEdit' => 'POST'
router.post('/mainmenu/:user/edit-contact/:idEdit', [
    requireValidEmail, 
    requireValidDate, 
    requireValidName, 
    requireValidLastName
], async (req, res, next) => {
    
    const errors = validationResult(req); 
    const { nameC, lastName, birthday, phoneNumber, email } = req.body;
    const id = req.params.idEdit;
    const userFrom = req.params.user;

    if(!errors.isEmpty()){
        console.log(errors);
    } else {
        const editedCorrect = await contactRepo.modify(id, userFrom, nameC, lastName, birthday, phoneNumber, email);
        res.redirect(`/mainmenu/${userFrom}/contacts`);
    }
});

/* Retocar la interfaz de la app y añadir sessions al loggeo
*/



module.exports = {
    contactsRouter: router
};
