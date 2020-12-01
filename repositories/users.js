//PACKAGES AND MODELS
const Sequelize = require('sequelize');
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

module.exports = User;