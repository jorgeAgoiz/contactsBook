// Database and connector setup
const Sequelize = require('sequelize');

/* *************** HERE YOUR DATABASE ARGUMENTS ************* */

//                               db.name    |   db.user   |   db.password
const sequelize = new Sequelize('contactsbook', 'root', 'nodecomplete2020', {
    dialect: 'mysql',// Database language
    host: 'localhost'// Your host
});
/* *************** HERE YOUR DATABASE ARGUMENTS ************* */

module.exports = sequelize;