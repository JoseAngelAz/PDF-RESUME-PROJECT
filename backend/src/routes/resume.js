const {Router} = require('express');
const router = Router();
const {getResumes,getResume,createResume,updateResume,deleteResume} = require('../controllers/resume.controllers');

router.route('/')
//Mostrar Resumes
.get(getResumes)
//Crear Resume
.post(createResume)

//RUTAS POR ID
router.route('/:id')
//Mostrar Resume por ID
.get(getResume)

//Modificar Resume
.put(updateResume)
//Eliminar Resume
.delete(deleteResume)


module.exports = router;