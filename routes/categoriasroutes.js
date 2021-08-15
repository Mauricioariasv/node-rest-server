const {Router} = require('express')
const {check} = require('express-validator')

const router = Router()
const { obtenerCategorias, obtenerCategoria, crearCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoriascontroller')
const { existeCategoria } = require('../helpers/db-validators')
const { validarJWT, esAdminRole } = require('../middlewares')

const {validarCampos} = require('../middlewares/validate-camps')

//Buscar categorías - público
router.get('/',  obtenerCategorias)

// Buscar categoría por id - público 
router.get('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria)

//Crear categoría - privado (token válido)
router.post('/',[
            validarJWT,
            check('nombre', 'El nombre es obligatorio').notEmpty(),
            validarCampos,
        ] , crearCategoria)

//Actualizar categoría - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'Es necesario colocar el nuevo nombre').notEmpty(),
    validarCampos

] , actualizarCategoria)

//Borrar categoría - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria)

module.exports = router