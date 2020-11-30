//PACKAGES AND MODELS
const Sequelize = require('sequelize');
const Contact = require('./contacts');
const sequelize = require('../util/database');

//IMPLEMENT THE SEQUELIZE SCHEMA
const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
// DEFINE THE RELATIONS BETTWEN TABLES ****************************************
User.hasMany(Contact, {foreignKey: 'userId', sourceKey: 'id'});

module.exports = User;