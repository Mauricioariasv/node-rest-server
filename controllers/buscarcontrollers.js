const {ObjectId} = require('mongoose').Types
const {Usuario, Categoria, Producto} = require('../models')

//Colecciones en las que se harán las búsquedas
const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino, res  ) => {
    const esMongoID = ObjectId.isValid( termino )
    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [ usuario ] : []
        })
    }

    //es una expresión regular que lo que hace es que al busquedas insensibles en la colección, busca
    //lo que se pide y encuentra cosas similares, sin importar si tiene mayúsculas, minúsculas, etc
    const regex =  new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{estado: true}]
    })
    res.json({
        //Acá no lo manejamos como terminario como hicimos antes porque el fin regresa arreglos vacíos
        results: usuarios
    })
}

const buscarCategoria = async( termino, res  ) => {
    const esMongoID = ObjectId.isValid( termino )
    if(esMongoID){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [ categoria ] : []
        })
    }

    const regex =  new RegExp(termino, 'i')

    const categorias = await Categoria.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })
    res.json({
        results: categorias
    })
}

const buscarProductos = async( termino, res  ) => {
    const esMongoID = ObjectId.isValid( termino )
    if(esMongoID){
        const producto = await Producto.findById(termino)
        return res.json({
            results: (producto) ? [ producto ] : []
        })
    }

    const regex =  new RegExp(termino, 'i')

    const productos = await Producto.find({
        $or: [{nombre: regex}],
        $and: [{estado: true}]
    })
    res.json({
        results: productos
    })
}

const buscar = (req,res) => {
    const {coleccion, termino} = req.params

    // Ver si la colección esta dentro de las colecciones permitidas
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }
    switch  (coleccion)   {
       case 'usuarios':
            buscarUsuarios(termino, res)
       break;

       case 'categoria':
            buscarCategoria(termino, res)
       break;

       case 'productos':
            buscarProductos(termino, res)
       break;

       default: 
        res.status(500).json({
            msg: 'Se me olvidó hacer está búsqueda'
        })
    }
}

module.exports = {  buscar  }