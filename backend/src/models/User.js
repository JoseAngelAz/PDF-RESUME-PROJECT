const{Schema,model} = require('mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let rolesValidos =([
    {
        values:["ADMIN","USER"],
        message:'{VALUE} no es un role válido'
    }
])

const userSchema = new Schema({
    nombre:{type:String, required:true,trim:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date, default: Date.now},
    role:{type:String,default:'USER'}
},{
    timestamps:true
});

//encryptando el password
userSchema.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
};

//comparar passwords
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User',userSchema);