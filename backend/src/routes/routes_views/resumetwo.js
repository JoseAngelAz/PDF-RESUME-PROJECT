const {Router} = require('express');
const router = Router();
const {GetAddResume,PostCreateResume,GetResumes,GetResumeEdit,PutEditResume,DeleteResume} = require('../../controladores/resumestwo.controller');


//consultar los Resumes
router.route('/resumes')
.get(GetResumes)

//vista agregar resume
router.route('/resumes/add')
.get(GetAddResume)
//agregar nuevo Resume
router.route('/resumes/new-resume')
.post(PostCreateResume)

//vista editar resume
router.route('/resumes/edit/:id')
.get(GetResumeEdit)
//Editar el Resume
router.route('/resumes/edit-resume/:id')
.put(PutEditResume)
//Eliminar un Resume
router.route('/resumes/delete/:id')
.delete(DeleteResume)

module.exports = router;