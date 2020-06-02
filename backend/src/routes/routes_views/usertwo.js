const {Router} = require('express');
const router = Router();
 require('../../models/User');
const{GetsigninPage, SigninPost,SignUpGet,PostNewUser,LogoutUser} = require('../../controladores/usertwo.controller');

router.route('/users/signin')
//renderizar vista signing
.get(GetsigninPage)
//renderizar los resumes del  usuario
.post(SigninPost)

//rutas SignUP
router.route('/users/signup')
.get(SignUpGet)
.post(PostNewUser)
//LOGOUT
router.route('/users/logout')
.get(LogoutUser)



module.exports = router;