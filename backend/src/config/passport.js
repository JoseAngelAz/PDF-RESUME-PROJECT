const passport = require('passport');
const User = require('../models/User');

//definimos estrategia
const LocalStrategy = require('passport-local').Strategy;

//parametros para auth al user
passport.use(new LocalStrategy({
    usernameField:'email'
},async(email,password,done)=>{
    const user = await User.findOne({email:email});
    if (!user) {
        return done(null,false,{message:'Not user found.'});
    }else{
        console.log(user)
        const match = await user.matchPassword(password);
        if (match) {console.log(user.password)
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect Password'});
        }
    }
}));

//almacenamos la sesion del user en un id
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

//lo contrario
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});

//para utilizar hacemos unas config en el inde.js principal