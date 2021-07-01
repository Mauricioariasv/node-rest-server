
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validate-camps');
const tieneRole = require('../middlewares/validate-roles');
const hayArchivo = require('./hay-arrchivo');

// Lo que hacen los 3 puntos es exportar ABSOLUTAMENTE todo lo que se exporta
module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...tieneRole,
    ...hayArchivo
}