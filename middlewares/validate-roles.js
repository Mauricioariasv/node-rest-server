const { response } = require("express")

const esAdminRole = (req, res = response, next) => {
    
    if(!req.usuario) {
        res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:  `${nombre} no eres admin pana`
            })
        }
    next()
}




const tieneRole = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usuario) {
            res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: 'el servicio requiere uno de estos roles'
            })
        }
        next()
    }
}


module.exports = {esAdminRole, tieneRole}