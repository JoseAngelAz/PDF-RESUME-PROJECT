const userCtrl = {};
const express = require('express');
const User = require('../models/User');

//Consultar Usuarios
userCtrl.getUsers = async(req,res)=>{
    const users = await User.find();
    res.json(users);
}

//Consultar por Id un Usuario
userCtrl.getUser = async(req,res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
}

//Crear Usuario
userCtrl.createUser = async (req,res)=>{
 const {username,email,password} = req.body;
 const newUser = new User({username,email,password});
 await newUser.save();
 res.json({message:'PUT- Usuario Creado'});
}

//Actualizar un Usuarios ById
userCtrl.updateUser = async(req,res)=>{
    const userupdated = {username,email,password} = req.body;
    await User.findOneAndUpdate({_id:req.params.id},userupdated);
    res.json({message:'PUT- Usuario Actualizado'});
}

//ELIMINAR Usuario
userCtrl.deleteUser = async(req,res)=>{
    const user = await User.findOneAndDelete({_id:req.params.id});
    res.json({message:'DELETE- Usuario Eliminado'});
}

module.exports = userCtrl;