const { body } = require('express-validator');
const usersRepo = require('../repositories/usersRepo');
const User = require('../repositories/users');

module.exports = {
    requireValidUser: body('inputUser')//Validator Sign Up
        .trim()
        .notEmpty()
        .withMessage('Must be a valid user')
        .custom(async inputUser => {
            const existingUser = await usersRepo.getOneBy({ inputUser });//Check if this email exists
            if (existingUser) {//if exists send a message
                throw new Error('User name in use.');
            }
        }),
    requireValidPassword: body('password1')//Validator Sign Up
        .trim()
        .isLength({min: 5, max: 20})
        .withMessage('Must be between 5 and 20 characters'),
    requirePasswordConfirmation: body('password2')//Validator Sign Up
        .trim()
        .isLength({min: 5, max: 20})
        .withMessage('Must be between 5 and 20 characters')
        .custom((password2, { req }) => {
            if(password2 !== req.body.password1){
                throw new Error('Passwords must match.');   
            }
            return true;
        }),
    requireValidPasswordForUser: body('password1')//Validator Sign In
        .trim(),
        /* .custom(async ({ req }) => {//Custon validator to compare the passwords

            await User.findOne({ where: { 
                password: password1, 
                username: req.body.inputUser}
                })
                .then( user => {
                    console.log('Correct validation');
                })
                .catch( err => {
                    console.log(err);
                    throw new Error('Invalid password.');
                });
        }), */
    requireValidUserName: body('inputUser')//Validator Sign In
        .trim()
        .notEmpty()
        .withMessage('Must provide a valid user.'),
        /* .custom(async inputUser => {//Custom validator to find the user in DB
            await User.findOne({ where: { username: inputUser } })
                .then( user => {
                    console.log(`Correct User ${user}`);
                })
                .catch( err => {
                    console.log(err);
                    throw new Error('User not found.');
                });
        }),*/
    requireValidEmail: body('email')//Add and Edit Contact Validator
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email'),
    requireValidDate: body('birthday')
        .trim()
        .isDate({format: 'DD/MM/YYYY', delimiters: '/'})
        .withMessage('Must be a valid date'),
    requireValidName: body('nameC')
        .trim()
        .notEmpty()
        .withMessage('Invalid name.'),
    requireValidLastName: body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Invalid last name.')
        
};