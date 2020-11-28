//Packages
const path = require('path');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const contactRepo = require('../repositories/contactsRepo');
const Contact = require('../repositories/contacts');
const User = require('../repositories/users');

const { 
    requireValidEmail, 
    requireValidDate, 
    requireValidName, 
    requireValidLastName
 } = require('../routes/validators');

// '/mainmenu/:userId/contacts' => GET
router.get('/mainmenu/:userId/contacts/:user', async (req, res, next) => {
    const userC = req.params.userId;
    const userN = req.params.user;

    await Contact.findAll({ where: { userId: userC }})
                .then( results => {
                    console.log(results);

                    res.render('myContacts.ejs', {
                        contacts: results,
                        pageTitle: "My Contacts",
                        userId: userC, 
                        user: userN
                    });
                })
                .catch( err => {
                    console.log(err);
                    res.redirect(`/mainmenu/${userN}`);
                });
    //const resultContacts = await contactRepo.getContactsFrom(userC);

    
});

// '/mainmenu/:user/delete-contact' => POST
router.post('/mainmenu/:user/delete-contact', async (req, res, next) => {
    const contactId = req.body.idDelete;
    const userMenu = req.params.user;

    const contactDel = await contactRepo.deleteOne(contactId);

    res.redirect(`/mainmenu/${userMenu}/contacts`);//********* Check modal in bootstrap framework
});


// '/mainmenu/:user/add-contact' => GET
router.get('/mainmenu/:user/add-contact', async (req, res, next) => {

    const userName = req.params.user;

    await User.findOne({ where: { username: userName }})
            .then( result => {
                console.log(result); 
                res.render('addContact.ejs', {
                    userId: result.id,
                    pageTitle: "Add A Contact",
                    userName: userName
                });
            })
            .catch( err => {
                console.log(err);
                res.redirect(`/mainmenu/${userName}`);
            });    
});// *********************** This is OK *****************************

// '/mainmenu/add-contact' => POST
router.post('/mainmenu/add-contact', [
    requireValidEmail, 
    requireValidDate, 
    requireValidName, 
    requireValidLastName
], async (req, res, next) => {

    const errors = validationResult(req);
    const { nameC, lastName, birthday, phoneNumber, email, userId, userName } = req.body;

    if(!errors.isEmpty()){
        console.log(errors);
    } else {
        await Contact.create({
            userId: userId,
            name: nameC,
            lastName: lastName,
            birthday: birthday,
            phoneNumber: phoneNumber,
            email: email
        })
        .then( result => {
            console.log('Contact Stored.');
            res.redirect(`/mainmenu/${userName}`);
        })
        .catch( err => {
            console.log(err);
            res.redirect('/mainmenu/add-contact');
        });
    }
    
});// *************** This i OK **********************

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
