//modelo de usuario para la base de datos de la aplicacion
const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: [true, 'El role es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
//exportamos el modelo de usuario para poder usarlo en otras partes de la aplicacion 
module.exports = model('Usuario', usuarioSchema);