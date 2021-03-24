const {Router} = require('express');
const router = Router();
const {usuariosDELETE,
        usuariosGET,
        usuariosPOST,
        usuariosPUT} = require('../controllers/usercontrollers')

router.get('/', usuariosGET);

router.put('/:id', usuariosPUT)

router.post('/', usuariosPOST)

router.delete('/', usuariosDELETE)



module.exports = router
