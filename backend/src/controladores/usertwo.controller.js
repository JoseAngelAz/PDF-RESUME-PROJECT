const usertwoCtrl = {};
const passport = require('passport');
const User = require('../models/User');


//renderiza la ruta signin
usertwoCtrl.GetsigninPage = async(req,res)=>{
    res.render('users/signin');
}

//renderiza los cv del usuario
usertwoCtrl.SigninPost = passport.authenticate('local',{
    successRedirect:'/resumes',
    failureRedirect:'/users/signin',
    failureFlash:true
}), ()=>{
   passport.authenticate('local',{
   successRedirect:'/resumes',
   failureRedirect:'/users/signin',
   failureFlash:true
})}

//user SignUp
usertwoCtrl.SignUpGet = (req,res)=>{
    res.render('users/signup');
}

//GUARDAR NUEVO USUARIO
usertwoCtrl.PostNewUser = async(req,res)=>{
    const  {nombre, email ,password, confirm_password} = req.body;
    console.log('Estos son los datos que vienen del frontend!!!',nombre, email,password, confirm_password)
    const errors = [];
   
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
   const newUser = new User({ nombre, email, password});
   //encryptPassword lo definimos en el modelo
   newUser.password = await newUser.encryptPassword(password)
   await newUser.save();
   req.flash('success_msg','Estás Registrado!')
   res.json({message:'PUT- Usuario Creado'});
   res.redirect('/users/singin');
   }

   }

    //LOGOUT
    usertwoCtrl.LogoutUser = (req,res)=>{
        req.logout();
        res.redirect('/index')
    }

module.exports = usertwoCtrl;