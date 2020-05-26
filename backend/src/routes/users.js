const {Router} = require('express');
const router = Router();
const {getUsers,getUser,createUser,updateUser,deleteUser} = require('../controllers/users.controllers');


router.route('/')
//Mostrar Usuarios
.get(getUsers)
//Crear Usuarios
.post(createUser)

//Rutas por ID
router.route('/:id')
//Mostrar por id
.get(getUser)
.put(updateUser)
.delete(deleteUser)


module.exports = router;