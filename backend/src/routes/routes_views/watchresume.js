const express = require('express')
const router = express.Router();
const Resum = require('../../models/Resume');
const {isAuthenticated} = require('../../config/auth');

//add
router.get('/resumes/add',isAuthenticated,(req,res)=>{
    res.render('resumes/new-resume');
});

//create
router.post('/resumes/new-resume',isAuthenticated,async(req,res)=>{
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
    numero_ref_dos
    
    } = req.body;
    const cagadas = [];
    if (!nombre||!edad||!direccion||!telefono||!celular||!email||!dui||!nit||!licencia||!nivel_acadmy||!lugar_acadmy||!info_tec||!otros_estudios||!exp_laboral||!conocimientos||!skills||!nombre_ref_uno||!numero_ref_uno||!nombre_ref_dos||!numero_ref_dos) {
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
        const newResume = new Resum({imagePath,
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
            numero_ref_dos,});
        newResume.user = req.user.id;
        console.log('ESTE ES EL RESUMEN DEL METHOD GUARDAR',newResume)
        await newResume.save();
        req.flash('success_msg','Cv Agregado Satisfactoriamente');
        res.redirect('/resumes')
    }
});

//consultar las notas
router.get('/resumes',isAuthenticated,async(req,res)=>{
    const cv = await Resum.find({user:req.user.id}).sort({date:'desc'}).lean();
    res.render('resumes/all-resumes',{cv});
});

//Editar(esta es la vista)
router.get('/resumes/edit/:id',isAuthenticated,async(req,res)=>{
    const cv = await Resum.findById(req.params.id).lean();
    console.log(cv);
    res.render('resumes/edit-resume',{cv});
});
//metodo que actualiza
router.put('/resumes/edit-resume/:id',isAuthenticated,async(req,res)=>{
    const cv= {
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
    } = req.body;
    await Resum.findByIdAndUpdate(req.params.id,{cv});
    req.flash('success_msg','Cv Actualizado');
    res.redirect('/resumes');
});

//delete
router.delete('/resumes/delete/:id',isAuthenticated,async(req,res)=>{
    await Resum.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Resume borrado');
    res.redirect('/resumes');
});

module.exports = router;