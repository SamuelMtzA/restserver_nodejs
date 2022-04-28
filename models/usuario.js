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
        enum: ['ADMIN_ROLE', 'USER_ROLE']
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
//debe ser una funcion porque se hara uso del objeto this
//metodo para que no se muestre la contraseña en la respuesta
usuarioSchema.methods.toJSON = function(){
    //sacar la version y el password y van a ser almacenados en el usuario
    const {__v, password, _id, ...usuario} = this.toObject();
    //cambiar el _id generado por moongose por el uid
    usuario.uid = _id;
    return usuario;
}

//exportamos el modelo de usuario para poder usarlo en otras partes de la aplicacion 
module.exports = model('Usuario', usuarioSchema);