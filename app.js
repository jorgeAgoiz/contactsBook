//Packages
const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();//Instance of express server
const sequelize = require('./util/database');

const { signupRouter } = require('./routes/signup');
const { signinRouter } = require('./routes/signin');
const { menuRouter } = require('./routes/mainmenu');
const { contactsRouter } = require('./routes/contacts');

// EJ6 TEMPLATE ENGINE
app.set('view engine', 'ejs');// Setting our default template engine
app.set('views', 'views');// Where can we found the views files

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(signupRouter);
app.use(signinRouter);
app.use(menuRouter);
app.use(contactsRouter);

// '/' => GET
app.get('/', (req, res, next) => {
    res.render('main.ejs', {
        pageTitle: 'Contacts Book'
    });
    //res.sendFile('/views/main.html', { root : __dirname});
});

sequelize
    .sync()
    .then( result => {
        //console.log(result);
        app.listen(3000, () => {
            console.log('Listening in port 3000...');
        });
    })
    .catch( err => {
        console.log(err);
    });

//Listen in port 3000
