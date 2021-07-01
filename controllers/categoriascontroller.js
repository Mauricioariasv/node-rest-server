const { response } = require("express");

const {Categoria, Usuario} = require('../models');
const categoriasRoutes = {};

categoriasRoutes.obtenerCategorias = async (req,res = response) => {
    const categorias = await Categoria.find().populate('usuario');
    const cuenta = await Categoria.countDocuments();
    res.json({
        cuenta, categorias
    })
}

categoriasRoutes.obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario')
    if(!categoria.estado){
        res.json({
            msg: ' No existe la categoría '
        })
    }
    res.json(categoria)
}

categoriasRoutes.crearCategoria = async (req,res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();
    
    const categoriaDB = await Categoria.findOne({nombre})
    
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoría ${nombre}, ya existe`
        })
    }
    
    // Generar la data a guardar (por si mandan estado cuando realmente ya está default true)
    const data = {
        nombre, 
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)

    await categoria.save()

    res.status(201).json(categoria)
}

categoriasRoutes.actualizarCategoria = async (req,res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id;
    const {nombre} = data

    const existeCategoria = await Categoria.findOne({nombre})
    if(existeCategoria){
        res.json({
            msg: `La categoria ${nombre} ya existe`
        })
    } 

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

    res.json({
        categoria
    })
}

categoriasRoutes.borrarCategoria = async (req,res = response) => {
    const {id} = req.params;
    await Categoria.findByIdAndUpdate(id, {estado: false})
    res.json({
        msg: `Categoría borrada`
    })
}
module.exports = categoriasRoutes;
