const {Router} = require('express')
const {check} = require('express-validator')

const { existeCategoria, existeProductoporID } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')
const {validarCampos} = require('../middlewares/validate-camps')

const router = Router()
const { obtenerProductos, 
    obtenerProducto, 
    crearProducto, 
    actualizarProducto, 
    borrarProducto } = require('../controllers/productoscontrollers')

//Buscar categorías - público
router.get('/',  obtenerProductos)

// Buscar categoría por id - público 
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoporID),
    validarCampos
], obtenerProducto)

//Crear categoría - privado (token válido)
router.post('/',[
            validarJWT,
            check('nombre', 'El nombre es obligatorio').notEmpty(),
            check('categoria', 'La categoria es obligatoria').notEmpty(),
            check('categoria', 'No es un id de Mongo').isMongoId(),
            check('categoria').custom(existeCategoria),
            validarCampos,
        ] , crearProducto)

//Actualizar categoría - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoporID),
    validarCampos

] , actualizarProducto)

//Borrar categoría - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeProductoporID),
    validarCampos
], borrarProducto)

module.exports = router