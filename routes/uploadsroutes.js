const {Router} = require('express');
const { check } = require('express-validator');
const {cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploadscontrollers');
const {coleccionesPermitidas} = require('../helpers/db-validators');
const { hayArchivo } = require('../middlewares');
const { validarCampos } = require('../middlewares/validate-camps');

const router = Router();

router.post('/', [hayArchivo], cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    hayArchivo,
    validarCampos
], actualizarImagenCloudinary)
//ActualizarImagen

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),
    validarCampos
], mostrarImagen)

module.exports = router