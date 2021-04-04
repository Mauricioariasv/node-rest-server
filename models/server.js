const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }
        //Conectar a la base de datos 
        this.conectarDB()
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicación
        this.routes();
    }
    async conectarDB(){
        await dbConnection()
    }
    middlewares(){
        //CORS
        this.app.use(cors())

        //  Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use( express.static('public') )
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authroutes'))
        this.app.use(this.paths.buscar, require('../routes/buscarroutes'))
        this.app.use(this.paths.categorias, require('../routes/categoriasroutes'))
        this.app.use(this.paths.productos, require('../routes/productosroutes'))
        this.app.use(this.paths.usuarios, require('../routes/userroutes'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;