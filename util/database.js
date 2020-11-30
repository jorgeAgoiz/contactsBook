// Database and connector setup
const Sequelize = require('sequelize');

const sequelize = new Sequelize('contactsbook', 'root', 'nodecomplete2020', {
    dialect: 'mysql',// Database language
    host: 'localhost'
});

module.exports = sequelize;