
const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    name: {
        type: String, 
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String, 
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        requied: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

// Para que no se vea la contraseña en el post

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);