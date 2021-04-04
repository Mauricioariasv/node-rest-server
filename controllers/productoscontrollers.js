const { response } = require("express");
const { sanitizeBody } = require("express-validator");

const {Producto} = require('../models');
const categoriasRoutes = {};

categoriasRoutes.obtenerProductos = async (req,res = response) => {
    const producto = await Producto.find().populate('usuario');
    const cuenta = await Producto.countDocuments();
    res.json({
        cuenta, producto
    })
}

categoriasRoutes.obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario')
    if(!producto.estado){
        res.json({
            msg: ' No existe la categoría '
        })
    }
    res.json(producto)
}

categoriasRoutes.crearProducto = async (req,res = response) => {
    
    //ignorar estado y usuario para que no los editen
    const {estado, usuario, ...body} = req.body;
    
    const productoDB = await Producto.findOne({nombre: body.nombre})
    
    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre}, ya existe`
        })
    }
    
    // Generar la data a guardar (por si mandan estado cuando realmente ya está default true)
    const data = {
        ...body,
        nombre: body.nombre, 
        usuario: req.usuario._id
    }

    const producto = new Producto(data)

    await producto.save()

    res.status(201).json(producto)
}

categoriasRoutes.actualizarProducto = async (req,res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if(data.nombre) {
        data.nombre = data.nombre.toUpperCase()
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.json({
        producto
    })
}

categoriasRoutes.borrarProducto = async (req,res = response) => {
    const {id} = req.params;
    await Producto.findByIdAndUpdate(id, {estado: false})
    res.json({
        msg: `Producto borrado`
    })
}

module.exports = categoriasRoutes;
