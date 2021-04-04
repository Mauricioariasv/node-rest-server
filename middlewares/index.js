
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validate-camps');
const tieneRole = require('../middlewares/validate-roles');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...tieneRole
}