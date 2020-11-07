const { body } = require('express-validator');
const usersRepo = require('../repositories/usersRepo');

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
        .trim()
        .custom(async (password2, { req }) => {//Custon validator to compare the passwords
            const user = await usersRepo.getOneBy({ inputUser: req.body.inputUser });
            if (!user) {
                throw new Error('Invalid password.');
            }
            const validPassword = await usersRepo.comparePasswords(
                user.password1,
                password2
            );

            if(!validPassword) {//if password is not correct
                throw new Error('Invalid password.');
            }
        }),
    requireValidUserName: body('inputUser')//Validator Sign In
        .trim()
        .notEmpty()
        .withMessage('Must provide a valid user.')
        .custom(async inputUser => {//Custom validator to find the user in DB
            const user = await usersRepo.getOneBy({ inputUser });
            if(!user) {//if user doesnt exists
                throw new Error('User not found.');
            }
        })
};