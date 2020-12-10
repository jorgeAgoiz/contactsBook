//PACKAGES AND MODELS
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// IMPLEMENT THE SEQUELIZE SCHEMA
const Contact = sequelize.define('contacts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Contact;