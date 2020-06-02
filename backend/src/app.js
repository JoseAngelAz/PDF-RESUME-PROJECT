require('./config/config');
require('./config/passport');
require('./database');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
const{allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const app = express();

//unos el path de src a la de views
app.set('views',path.join(__dirname,'views'));

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    handlebars:allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine','.hbs');

//otros middlewares
//pasr application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));
//modulo de sesion
app.use(session({
    secret:'mysecrecv',
    resave:true,
    saveUninitialized:true
}));

//Middleware de passport
app.use(passport.initialize());
app.use(passport.session());

//flash para enviar mensajes
app.use(flash());

//variables globales
app.use((req,res,next)=>{
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.user||null;
next();
});



//parse application/json
app.use(bodyParser.json());

//middlewares
app.use(cors());
app.use(express.json());

//routes

app.use('/api/login',require('./routes/login'));
app.use('/api/users',require('./routes/users'));
app.use('/api/resumes',require('./routes/resume'));
app.use(require('./routes/index'));
//app.use(require('./routes/routes_views/usertwo'));
app.use(require('./controladores/usuarios'));
app.use(require('./routes/routes_views/resumetwo'));
//mirar resumes
app.use(require('./routes/routes_views/watchresume'));
//para el css
app.use(express.static(path.join(__dirname,'public')));


//settings server
app.set('port',process.env.PORT||3333);

module.exports = app;