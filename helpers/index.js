const dbValidators = require('./db-validators')
const generarJWT = require('./generar-jwt')
const subirArchivo = require('./subir-archivo')


// Lo que hacen los 3 puntos es exportar ABSOLUTAMENTE todo lo que se exporta
module.exports = {
    ...dbValidators,
    ...generarJWT, 
    ...subirArchivo
 }