//Packages
const path = require('path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();//Instance of express server

const { signupRouter } = require('./routes/signup');
const { signinRouter } = require('./routes/signin');
const { menuRouter } = require('./routes/mainmenu');

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(signupRouter);
app.use(signinRouter);
app.use(menuRouter);

// '/' => GET
app.get('/', (req, res, next) => {
    res.sendFile('/views/main.html', { root : __dirname});
});

//Listen in port 3000
app.listen(3000, () => {
    console.log('Listening in port 3000...');
});