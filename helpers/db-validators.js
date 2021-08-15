const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })

    if(!existeRol){
            throw new Error('El rol no está registrado en la BD')
    }
}

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

const existeCategoria = async ( id ) => {
    const existeCateg   = Categoria.findOne( id )
    if(!existeCateg){
        throw new Error('La categoría no existe')
    }
}

const existeProductoporID  = async ( id ) => {
const existeProducto = await Producto.findById( id )
    if(!existeProducto){
        throw new Error('El producto no existe')
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion );
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`)
    }

    return true
}

module.exports = {
    esRolValido, 
    emailExiste, 
    existeIDdeUsuario, 
    existeCategoria, 
    existeProductoporID,
    coleccionesPermitidas
}