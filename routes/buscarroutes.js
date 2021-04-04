const {Router} = require('express')
const router = Router()

const {buscar} = require('../controllers/buscarcontrollers')

router.get('/:coleccion/:termino', buscar)

module.exports = router