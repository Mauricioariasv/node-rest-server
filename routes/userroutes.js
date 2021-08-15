const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const {usuariosDELETE,
        usuariosGET,
        usuariosPOST,
        usuariosPUT} = require('../controllers/usercontrollers');


const { esRolValido, emailExiste, existeIDdeUsuario } = require('../helpers/db-validators');

const {validarCampos, validarJWT, tieneRole} = require('../middlewares')

router.get('/', usuariosGET);

router.put('/:id',[
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeIDdeUsuario ),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPUT)

router.post('/',[
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña debe tener más de 6 letras').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom( emailExiste ),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPOST)

router.delete('/:id', [
        validarJWT,
        tieneRole('ADMIN_ROLE', 'USER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeIDdeUsuario ),
        validarCampos
] ,usuariosDELETE)



module.exports = router
