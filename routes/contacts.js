//Packages
const path = require('path');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
// ***** MODELS REPOSITORIES
const Contact = require('../repositories/contacts');
const User = require('../repositories/users');
//const contactRepo = require('../repositories/contactsRepo');

// IMPORT THE VALIDATORS
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
});

// '/mainmenu/:user/delete-contact' => POST
router.post('/mainmenu/:userId/delete-contact', async (req, res, next) => {
    const contactId = req.body.idDelete;
    const userMenu = req.params.userId;

    const user = await User.findOne({ where: { id: userMenu }});

    const cont = await Contact.findOne({ where: { id: contactId }});
    await cont.destroy();

    res.redirect(`/mainmenu/${userMenu}/contacts/${user.username}`);//********* Check modal in bootstrap framework
});


// '/mainmenu/:user/add-contact' => GET
router.get('/mainmenu/:user/add-contact', async (req, res, next) => {
    const userName = req.params.user;

    await User.findOne({ where: { username: userName }})
            .then( result => {
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
});

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
    
});

// '/mainmenu/:user/edit-contact/:idEdit' => 'GET'
router.get('/mainmenu/:userId/edit-contact/:idEdit', async (req, res, next) => {  
    const idContact = req.params.idEdit; 
    const userId = req.params.userId;
    const user = await User.findOne({ where: { id: userId }});
    
    await Contact.findOne({ where: { id: idContact }})
                .then( result => {
                    res.render('editContact.ejs', {
                        pageTitle: 'Edit Contact',
                        contact: result,
                        userN: user.username
                    });
                })
                .catch( err => {
                    console.log(err);
                    res.redirect(`/mainmenu/${user.username}`);
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
    const idContact = req.params.idEdit;
    const userFrom = req.params.user;

    if(!errors.isEmpty()){
        console.log(errors);
        res.redirect(`/mainmenu/${result.userId}/edit-contact/${idContact}`);
    } else {
        let userUp = await Contact.findOne({ where: { id: idContact }})
                                .then( result => {
                                    result.name = nameC;
                                    result.lastName = lastName;
                                    result.birthday = birthday;
                                    result.phoneNumber = phoneNumber;
                                    result.email = email;

                                    result.save();
                                    res.redirect(`/mainmenu/${result.userId}/contacts/${userFrom}`);
                                    return result;
                                })
                                .catch( err => {
                                    console.log(err);
                                    res.redirect(`/mainmenu/${result.userId}/edit-contact/${idContact}`);
                                });
    };
});

module.exports = {
    contactsRouter: router
};
