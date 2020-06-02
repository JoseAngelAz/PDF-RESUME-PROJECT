const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
 

//renderiza la vista signin
router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
});

//ruta de signin con post
router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/resumes',
    failureRedirect:'/users/signin',
    failureFlash:true
}));
//vista del signup
router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
});

//GUARDAR
router.post('/users/signup',async(req,res)=>{
 const {nombre, email,password, confirm_password} = req.body;
 const errors = [];
console.log({nombre, email,password, confirm_password})
 if (nombre.length <= 0){
     errors.push({text:'Por Favor escribe tu nombre'});
 }
 if (email.length <= 0) {
     errors.push({text:'Por favor escribe tu Email'});
 }
 if (password.length <= 0) {
    errors.push({text:'Por favor escribe tu Contraseña'});
}
if (confirm_password.length <= 0) {
    errors.push({text:'Por favor confirma tu Contraseña'});
}
if (password != confirm_password) {
    errors.push({text:'Las Contraseñas no coinciden'});
}
if (password.length < 4|| confirm_password.length < 4) {
    errors.push({text:'Ambas contraseñas deben tener al menos 4 caracteres'})
}
if (errors.length > 0) {
    res.render('users/signup',{errors,nombre,email,password});
}else{
//validamos que no se inserte el mismo Email repetido
const emailUser = await User.findOne({email:email});
if (emailUser) {
    req.flash('error_msg','Este Email ya está en uso');
    res.redirect('/users/signup');
}
//comenzamos a guardar el esquema del user
const newUser = new User({
    nombre, email, password
});
//encryptPassword lo definimos en el modeloc
console.log('ANTES DE ENCRYPTAR', newUser)
newUser.password = await newUser.encryptPassword(password);
await newUser.save();
req.flash('success_msg','Estás Registrado!')
res.redirect('/users/signin');
}

});
//LOGOUT
router.get('/users/logout',(req,res)=>{
    req.logout();
    res.redirect('/index');
});

module.exports = router;