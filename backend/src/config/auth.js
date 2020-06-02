const helpers ={};

helpers.isAuthenticated = (req,res,next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg','No Autorizado');
    res.redirect('/users/signin');
};//es tambien un middleware

//USAR EN CURRICULUMS DESPUES DE DEFINIR ESTA FUNCION
module.exports = helpers;