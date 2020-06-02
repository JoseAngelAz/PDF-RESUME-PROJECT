const{Schema,model} = require('mongoose');

const resumeSchema = new Schema({
    imagePath:{type:String, required:false},
    nombre:{type:String,required:true},
    edad:{type:String,required:true},
    direccion:{type:String,required:true},
    telefono:{type:String,required:false},
    celular:{type:String,required:false},
    email:{type:String,required:true},
    dui:{type:String,required:true},
    nit:{type:String,required:true},
    licencia:{type:String,required:false},
    nivel_acadmy:{type:String,required:true},
    lugar_acadmy:{type:String,required:true},
    info_tec:{type:String,required:false},
    otros_estudios:{type:String,required:false},
    exp_laboral:{type:String,required:false},
    conocimientos:{type:String,required:false},
    skills:{type:String,rerquired:false},
    nombre_ref_uno:{type:String,required:false},
    numero_ref_uno:{type:String,required:false},
    nombre_ref_dos:{type:String,required:false},
    numero_ref_dos:{type:String,required:false},
    user:{type:String}
});


module.exports = model ('Resume',resumeSchema);