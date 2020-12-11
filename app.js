//Packages
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const app = express();//Instance of express server
const sequelize = require('./util/database');
const { signupRouter } = require('./routes/signup');
const { signinRouter } = require('./routes/signin');
const { menuRouter } = require('./routes/mainmenu');
const { contactsRouter } = require('./routes/contacts');

// MODELS
const User = require('./repositories/users');
const Contact = require('./repositories/contacts');
// DEFINE THE RELATIONS BETTWEN TABLES ****************************************
User.hasMany(Contact, { foreignKey: 'userId', sourceKey: 'id' });

// EJ6 TEMPLATE ENGINE
app.set('view engine', 'ejs');// Setting our default template engine
app.set('views', 'views');// Where can we found the views files

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    keys: ['ashoqp710p290a']
}));
app.use(express.static(path.join(__dirname, 'public')));
// ROUTES
app.use(signupRouter);
app.use(signinRouter);
app.use(menuRouter);
app.use(contactsRouter);

// '/' => GET
app.get('/', (req, res, next) => {
    res.render('main.ejs', {
        pageTitle: 'Contacts Book'
    });
});

sequelize
    //.sync({ force: true })
    .sync()
    .then(result => {
        //Listen in port 3000
        app.listen(3000, () => {
            console.log('Listening in port 3000...');
        });
    })
    .catch(err => {
        console.log(err);
    });
