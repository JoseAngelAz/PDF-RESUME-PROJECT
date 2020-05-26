const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Router} = require('express');
const Usuario =require('../models/User');
const app = express();

app.post('/login',function(req,res){
    let caled = req.body;

    Usuario.findOne({email:caled.email},(erro,usuarioDB)=>{
        if (erro) {
            return res.status(500).json({
                ok:false,
                err:erro
            });
        }
        //verificando que el usuario exista con el Email escrito por el usuario.
        if (!usuarioDB) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:"Usuario o Email Incorrectos"
                }
            });
        }

        //validadnod que el password ecrito por el usuario, sea la almacenada en la db
        if (!bcrypt.compareSync(caled.password, usuarioDB.password)) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:"Usuario o Password Incorrectos"
                }
            });
        }

        //Generando el Token de autenticación
        let token = jwt.sign({
            usuario:usuarioDB,
        },process.env.SEED_AUTENTICATION,{
            expiresIn:process.env.CADUCIDAD_TOKEN
        });

        res.json({
            ok:true,
            usuario:usuarioDB,
            token
        });

    });//fin de finone
});//fin del login route


module.exports = app;
