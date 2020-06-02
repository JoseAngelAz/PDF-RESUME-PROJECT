const {Router} = require('express');
const router = Router();
const {GetIndex,GetAbout} = require('../controladores/indexInit');

router.route('/index')
.get(GetIndex)

router.route('/about')
.get(GetAbout)

module.exports = router;