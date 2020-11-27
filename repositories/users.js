const Sequelize = require('sequelize');
const Contact = require('./contacts');

const sequelize = require('../util/database');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Contact,
            key: 'userId'
        }
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

User.hasMany(Contact, {foreignKey: 'userId', targetKey: 'id'});

module.exports = User;