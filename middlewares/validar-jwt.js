const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header( 'x-token' )
    
    if(!token) {
        return res.status(401).json({
            msg: 'no hay token en la petición'
        })
    }
    
    try {
        //verificar si es un token y además saca el id del usuario del token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Leer el usuario que corresponde al uid

        const usuario = await Usuario.findById(uid)
        if(!usuario){
            return res.status(401).json({
                msg: 'token no válido - usuario no existen en DB'
            })
        }
        //Verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no válido - usuario en false'
            })
        }
        req.usuario = usuario


        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}