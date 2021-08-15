const path = require('path')
const {subirArchivo} = require('../helpers')
const fs = require('fs')
const {Usuario, Producto} = require('../models')
const { response } = require('express')

const cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo = async (req,res) => {

    try {
      const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
      
      res.json({
        nombre
      })
    } catch (error) {
      res.status(400).json(error)
    }
}

const actualizarImagen = async (req,res) => {

const {id, coleccion} = req.params

let modelo;

switch (coleccion) {
  case 'usuarios':
    modelo = await Usuario.findById(id);
    
    if (!modelo){
      return res.status(400).json({
        msg: 'No existe un usuario con ese id'
      })
    } 


  break;

  case 'productos':
    modelo = await Producto.findById(id);
    
    if (!modelo){
      return res.status(400).json({
        msg: 'No existe un producto con ese id',
      })
    } 

  break;

  default:
    return res.status(500).json({msg: 'Se me olvidó validar esto'})
}


  //Limpiar imagenes previas
  if(modelo.img){
    // Borrar imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

    // Si el pathImagen se encuentra en los archivos de node, lo borra
    if(fs.existsSync( pathImagen) ){
      fs.unlinkSync(pathImagen)
    }
  }

  //Guardar imagen
  const nombre = await subirArchivo(req.files, ['png', 'jpg'], coleccion);
  modelo.img = nombre 

  await modelo.save()


  res.json(modelo)

}

const mostrarImagen = async (req,res = response) => {
  
  
const {id, coleccion} = req.params

let modelo;

switch (coleccion) {
  case 'usuarios':
    modelo = await Usuario.findById(id);
    
    if (!modelo){
      return res.status(400).json({
        msg: 'No existe un usuario con ese id'
      })
    } 


  break;

  case 'productos':
    modelo = await Producto.findById(id);
    
    if (!modelo){
      return res.status(400).json({
        msg: 'No existe un producto con ese id',
      })
    } 

  break;

  default:
    return res.status(500).json({msg: 'Se me olvidó validar esto'})
}


  //Limpiar imagenes previas
  if(modelo.img){
    // Borrar imagen del servidor
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)

    // Si el pathImagen se encuentra en los archivos de node, lo borra
    if(fs.existsSync( pathImagen) ){
     return res.sendFile(pathImagen)
    }
  }

  const defaultImage = path.join(__dirname, '../assets', 'no-image.jpg')
  res.sendFile(defaultImage)

}


const actualizarImagenCloudinary = async (req,res) => {

  const {id, coleccion} = req.params
  
  let modelo;
  
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      
      if (!modelo){
        return res.status(400).json({
          msg: 'No existe un usuario con ese id'
        })
      } 
  
  
    break;
  
    case 'productos':
      modelo = await Producto.findById(id);
      
      if (!modelo){
        return res.status(400).json({
          msg: 'No existe un producto con ese id',
        })
      } 
  
    break;
  
    default:
      return res.status(500).json({msg: 'Se me olvidó validar esto'})
  }
  
    if(modelo.img){
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      
      const [ public_id ] = nombre.split('.');
      cloudinary.uploader.destroy(public_id);
    }

    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath )

    modelo.img = secure_url 
  
    await modelo.save()

    res.json(modelo)
  
  }


module.exports = {
  cargarArchivo, 
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary
}