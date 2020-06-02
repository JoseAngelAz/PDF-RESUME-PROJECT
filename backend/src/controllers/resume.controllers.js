const resumeCtrl = {};
const Resume = require('../models/Resume');

//Consultar Resumes(FUNCIONA)
resumeCtrl.getResumes = async(req,res)=>{
    const resumes = await Resume.find();
    res.json(resumes);
}

//Consultar Resume por ID(FUNCIONA)
resumeCtrl.getResume = async(req,res)=>{
    const resume = await Resume.findById(req.params.id);
    res.json(resume);
}

//Crear Resume(FUNCIONA)
resumeCtrl.createResume = async(req,res)=>{
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
        numero_ref_dos} = req.body;
    const newResume = new Resume(
        {
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
            numero_ref_dos}
    );
    await newResume.save();
    console.log(newResume);
    res.json({message:'POST- Resume Creado'});
}

//Modificar Resume(FUNCIONA)
resumeCtrl.updateResume = async(req,res)=>{
    const resumeUpdated = {
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
        numero_ref_dos} = req.body;
        await Resume.findOneAndUpdate({_id:req.params.id},resumeUpdated);
        res.json({message:'PUT- Resume Actualizado'});
}

//Eliminar Resume
resumeCtrl.deleteResume = async(req,res)=>{
    const resume = await Resume.findOneAndDelete({_id:req.params.id});
    res.json({message:'DELETE- Resume Eliminado'});
}

module.exports = resumeCtrl;