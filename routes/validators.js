const { body } = require('express-validator');
const User = require('../repositories/users');

module.exports = {
    /* ***************** SIGN UP VALIDATORS ***************** */
    requireValidUser: body('inputUser')//Validator Sign Up
        .trim()
        .notEmpty()
        .withMessage('Must be a valid user')
        .custom(async inputUser => {
            const existingUser = await User.findOne({where: {username: inputUser}}); //Check if this email exists
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
        .custom((password2, { req }) => {//To check password and password confirmation are equals
            if(password2 !== req.body.password1){
                throw new Error('Passwords must match.');   
            }
            return true;
        }),
        /* ***************** SIGN IN VALIDATORS ***************** */
    requireValidPasswordForUser: body('password1')//Validator Sign In
        .trim()
        .notEmpty()
        .withMessage('Must provide valid password'),
    requireValidUserName: body('inputUser')//Validator Sign In
        .trim()
        .notEmpty()
        .withMessage('Must provide a valid user.'),
        /* ***************** EDIT CONTACT VALIDATORS ***************** */
    requireValidEmail: body('email')//Add and Edit Contact Validator
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Must be a valid email'),
    requireValidDate: body('birthday')
        .trim()
        .toDate(),
    requireValidName: body('nameC')
        .trim()
        .notEmpty()
        .withMessage('Invalid name.'),
    requireValidLastName: body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Invalid last name.')
        
};