const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

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
            uploads: '/api/uploads',
            usuarios: '/api/usuarios'
        }
        this.conectarDB()
        this.middlewares();
        this.routes();
    }
    async conectarDB(){
        await dbConnection()
    }
    middlewares(){
        this.app.use(cors())

        this.app.use(express.json());

        this.app.use( express.static('public') )

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authroutes'))
        this.app.use(this.paths.buscar, require('../routes/buscarroutes'))
        this.app.use(this.paths.categorias, require('../routes/categoriasroutes'))
        this.app.use(this.paths.productos, require('../routes/productosroutes'))
        this.app.use(this.paths.usuarios, require('../routes/userroutes'))
        this.app.use(this.paths.uploads, require('../routes/uploadsroutes'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server;