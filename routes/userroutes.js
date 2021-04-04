const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();
const {usuariosDELETE,
        usuariosGET,
        usuariosPOST,
        usuariosPUT} = require('../controllers/usercontrollers');


const { esRolValido, emailExiste, existeIDdeUsuario } = require('../helpers/db-validators');

// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarCampos } = require('../middlewares/validate-camps');
// const { esAdminRole, tieneRole } = require('../middlewares/validate-roles');
const {validarCampos, validarJWT, tieneRole} = require('../middlewares')

const {vali} = require('../middlewares')
router.get('/', usuariosGET);

router.put('/:id',[
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeIDdeUsuario ),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPUT)

router.post('/',[
        check('name', 'El nombre es obligatorioaaa').notEmpty(),
        check('password', 'La contraseña debe tener más de 6 letras').isLength({min: 6}),
        check('email', 'El correo no es válido').isEmail(),
        check('email').custom( emailExiste ),
        // check('rol', 'No es un rol válido').isIn(['ADMING_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
], usuariosPOST)

router.delete('/:id', [
        validarJWT,
       // esAdminRole,

       //Puede ser solamente de estos dos roles
        tieneRole('ADMIN_ROLE', 'USER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeIDdeUsuario ),
        validarCampos
] ,usuariosDELETE)



module.exports = router
