const Categoria = require('./categoria');
const Role = require('./role')
const Usuario = require('./usuario')
const Server = require('./server')
const Producto = require('./producto')


// Lo que hacen los 3 puntos es exportar ABSOLUTAMENTE todo lo que se exporta
//Ordenar alfabeticamente
module.exports = {
    Categoria,
    Producto,
    Usuario,
    Server,
    Role,
}