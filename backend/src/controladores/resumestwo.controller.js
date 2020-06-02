const ResumeCtrl = {}
const Cv = require('../models/Resume');
const {isAuthenticated} = require('../config/auth');

//renderizar vista de nuevo Cv
ResumeCtrl.GetAddResume = isAuthenticated, (req,res)=>{
     isAuthenticated();
    res.render('../views/resumes/new-resume');
}

//Crear Resume
ResumeCtrl.PostCreateResume = isAuthenticated,async(req,res)=>{
    isAuthenticated();
    const {
        imagePath,
    nombre,
    edad,
    direccion,
    telefono,
    celular,
    email,
    dui,
    nit,
    licencia,
    nivel_acadmy,
    lugar_acadmy,
    info_tec,
    otros_estudios,
    exp_laboral,
    conocimientos,
    skills,
    nombre_ref_uno,
    numero_ref_uno,
    nombre_ref_dos,
    numero_ref_dos,
    user
    } = req.body;
    const cagadas = [];
    if (!nomber||!edad||!direccion||!telefono||!celular||!email||!dui||!nit||!licencia||!nivel_acadmy||!lugar_acadmy||!info_tec||!otros_estudios||!exp_laboral||!conocimientos||!skills||!nombre_ref_uno||!numero_ref_uno||!nombre_ref_dos||!numero_ref_dos) {
        cagadas.push({text:'Por favor llena el formulario'});
    }
    if (cagadas.length > 0) {
        res.render('resumes/new-resume',{
        cagadas,
        imagePath,
        nombre,
        edad,
        direccion,
        telefono,
        celular,
        email,
        dui,
        nit,
        licencia,
        nivel_acadmy,
        lugar_acadmy,
        info_tec,
        otros_estudios,
        exp_laboral,
        conocimientos,
        skills,
        nombre_ref_uno,
        numero_ref_uno,
        nombre_ref_dos,
        numero_ref_dos
        
        });
    }else{
        //Guardar el Nuevo Cv
        const resume = new Cv({
        imagePath,
        nombre,
        edad,
        direccion,
        telefono,
        celular,
        email,
        dui,
        nit,
        licencia,
        nivel_acadmy,
        lugar_acadmy,
        info_tec,
        otros_estudios,
        exp_laboral,
        conocimientos,
        skills,
        nombre_ref_uno,
        numero_ref_uno,
        nombre_ref_dos,
        numero_ref_dos        
        });
        resume.user = req.user.id;
        await resume.save();
        req.flash('success_msg','Cv Agregado Satisfactoriamente');
        res.redirect('/resumes')
    }
}

//Consultar los resumes
ResumeCtrl.GetResumes = isAuthenticated,async(req,res)=>{
    isAuthenticated();
    const resume = await Cv.find({user:req.user.id}).sort({date:'desc'}).lean();
    console.log(resume)
    res.json({message:'METODO VER RESUMES'});
    res.redirect('resumes',{resume});
}

//renderizar Cv en vista Editar Cv
ResumeCtrl.GetResumeEdit = isAuthenticated,async(req,res)=>{
    isAuthenticated();
    const resume = await Cv.findById(req.params.id).lean();
    res.render('resumes/edit-resume',{resume});
}
//Editar el Cv renderizado
ResumeCtrl.PutEditResume = isAuthenticated,async(req,res)=>{
    isAuthenticated();
     const resume = {
        imagePath,
    nombre,
    edad,
    direccion,
    telefono,
    celular,
    email,
    dui,
    nit,
    licencia,
    nivel_acadmy,
    lugar_acadmy,
    info_tec,
    otros_estudios,
    exp_laboral,
    conocimientos,
    skills,
    nombre_ref_uno,
    numero_ref_uno,
    nombre_ref_dos,
    numero_ref_dos,
    user
    } = req.body;

    await Cv.findByIdAndUpdate(req.params.id,{resume});
    req.flash('success_msg','Cv Actualizado Satisfactoriamente');
    res.redirect('/resumes')
}

//Eliminar Cv
ResumeCtrl.DeleteResume = isAuthenticated,async(req,res)=>{
    isAuthenticated();
    await Cv.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Cv Eliminado Satisfactoriamente');
    res.redirect('/resumes');
}


module.exports = ResumeCtrl;