const{Schema,model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos =([
    {
        values:["ADMIN","USER"],
        message:'{VALUE} no es un role válido'
    }
])

const userSchema = new Schema({
    username:{type:String, required:true,trim:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date, default: Date.now},
    role:{type:String,default:'USER',required:[true],enum:rolesValidos}
},{
    timestamps:true
});


//elimina la key password del objeto que retorna al momento de crear el usuario

userSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator,{
    message:'{PATH} debe de ser único'
});

module.exports = model('User',userSchema);