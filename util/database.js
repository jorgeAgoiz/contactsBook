const Sequelize = require('sequelize');

const sequelize = new Sequelize('contactsbook', 'root', 'nodecomplete2020', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;