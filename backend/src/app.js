require('./config/config');
require('./config/passport');
require('./database');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const app = express();

//modulo de sesion
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true
}));

//Middleware de passport
app.use(passport.initialize());
app.use(passport.session());

//flash para enviar mensajes
app.use(flash());

//pasr application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({extended:false}));

//parse application/json
app.use(bodyParser.json());
//settings server
app.set('port',process.env.PORT||3333);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use('/api/login',require('./routes/login'));
app.use('/api/users',require('./routes/users'));
app.use('/api/resume',require('./routes/resume'));

module.exports = app;