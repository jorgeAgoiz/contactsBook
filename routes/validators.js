const { body } = require('express-validator');
const usersRepo = require('../repositories/usersRepo');

module.exports = {
    requireValidUser: body('inputUser')
        .trim()
        .notEmpty()
        .withMessage('Must be a valid user'),
    requireValidPassword: body('password1')
        .trim()
        .isLength({min: 5, max: 20})
        .withMessage('Must be between 5 and 20 characters'),
    requirePasswordConfirmation: body('password2')
        .trim()
        .isLength({min: 5, max: 20})
        .withMessage('Must be between 5 and 20 characters')
        .custom((password2, { req }) => {
            if(password2 !== req.body.password1){
                throw new Error('Passwords must match.');   
            }
            return true;
        })
};