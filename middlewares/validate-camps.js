const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json(errors)
    }
    next()
}

//Express validator usa throw new Error('a') para lanzar errores

module.exports = {
    validarCampos
}

