const { response } = require('express')
const Usuario = require('../models/usuario')

const bcryptjs = require('bcryptjs')

const {generarJWT} = require('../helpers/generar-jwt')

const authController = {}

authController.login = async(req, res = response) => {

    const { email, password } = req.body

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({email})
        if (!usuario){
            return res.status(400).json({
                msg: 'usuario o contraseña incorrectos'
            })
        }

        // Si el usuario está activo

        if (!usuario.estado){
            return res.status(400).json({
                msg: 'usuario o contraseña incorrectos - estado false'
            })
        }

        // Verficar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'usuario o contraseña incorrectos -password'
            })
        }

        // Generar jwt
        const token = await generarJWT(usuario.id)

        res.json({
            msg: 'todo bem',
            usuario, token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

module.exports = authController;