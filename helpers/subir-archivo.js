const path = require('path')
const {v4: uuidv4} = require('uuid');


// Usa una promesa porque acá no podemos usar res para dar respuesta
// de esta forma maneja si todo sale bien o mal

const subirArchivo = (files, extensionesValidas = ['png','jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {

    const {archivo} = files;


    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1]

    if ( !extensionesValidas.includes(extension))  {
       return reject(`La extensión ${extension} no es válida`)
    }

    const nombreTemp = uuidv4() + '.' + extension;

    // ../uploads/ <-- Donde se guarda | archivo.name <-- Nombre del archivo
    // Se cambió a nombreTemp porque usará el id único de uuidv4
    const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp) ;

    archivo.mv(uploadPath, function(err) {
      if (err) {
        reject(err)
      }

      resolve(nombreTemp)
    }); 
    })
} 


module.exports = {subirArchivo}