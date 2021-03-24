const {response} = require('express')
const users = {}

users.usuariosGET = (req,res = response) => {
    const {q, nombre, apikey} = req.query;
    res.json({
        msg: 'get API',
        q, nombre, apikey
    })
}
users.usuariosPUT = (req,res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'put API',
        id
    })
}
users.usuariosPOST = (req,res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API',
        nombre, edad
    })
}
users.usuariosDELETE = (req,res = response) => {
    res.json({
        msg: 'delete API'
    })
}
module.exports = users