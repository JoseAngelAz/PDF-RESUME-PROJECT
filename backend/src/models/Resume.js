const{Schema,model} = require('mongoose');

const ref_pSchema = new Schema([{
    nombre_ref_uno:{type:String,required:false},
    numero_ref_uno:{type:Number,required:false}
},
{
    nombre_ref_dos:{type:String,required:false},
    numero_ref_dos:{type:Number,required:false}
}]);

const resumeSchema = new Schema({
    imagePath:{type:String, required:false},
    nombre:{type:String,required:true},
    edad:{type:Number,required:true},
    direccion:{type:String,required:true},
    telefono:{type:Number,required:false},
    celular:{type:Number,required:false},
    email:{type:String,required:true},
    dui:{type:Number,required:true},
    nit:{type:Number,required:true},
    licencia:{type:String,required:false},
    nivel_acadmy:{type:String,required:true},
    lugar_acadmy:{type:String,required:true},
    info_tec:{type:String,required:false},
    otros_estudios:{type:String,required:false},
    exp_laboral:{type:String,required:false},
    conocimientos:{type:String,required:false},
    skills:{type:String,rerquired:false},
    ref_personales:[ref_pSchema]
});


module.exports = model ('Resume',resumeSchema);