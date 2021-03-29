const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    // el ! significa null
    if(!existeRol){
            throw new Error('El rol no está registrado en la BD')
    }
}

//Verificar si el correo existe
const emailExiste = async(email) => {
    const existeEmail = await Usuario.findOne({email: email})
    if (existeEmail) {
            throw new Error('El correo ya está registrado')
    }
}

const existeIDdeUsuario = async(id) => {
    const existeID = await Usuario.findById(id)
    if ( !existeID) {
            throw new Error('El id no existe')
    }
}
module.exports = {esRolValido, emailExiste, existeIDdeUsuario}