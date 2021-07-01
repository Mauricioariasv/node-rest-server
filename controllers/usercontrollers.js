const {response} = require('express')

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const users = {}

users.usuariosGET = async(req,res = response) => {
    const {limit = 5 , to = 2} = req.query

    const rep = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
        .limit(Number(limit))
        .skip(Number(to))
    ])
    res.json({
        msg: 'get API',
        rep
    })
}
users.usuariosPUT = async(req,res = response) => {
    const {id} = req.params;

    // Resto almacena las demás propiedades que vienen en el req.body
    
    const {_id, password, google, email, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password) {
        //Encriptar contraseña nueva
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuario)
}
users.usuariosPOST = async (req,res = response) => {

    const {name, google, email, password, rol} = req.body
    const usuario = new Usuario({name, google, email,password, rol})

    
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()

    res.json({
        msg: 'post API',
        usuario
    })
}
users.usuariosDELETE = async (req,res = response) => {
    const {id} = req.params;

    const user = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    res.json({msg: 'delete API', user})
}
module.exports = users