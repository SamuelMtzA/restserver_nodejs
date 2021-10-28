//validaciones personalizadas para la base de datos
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const isRoleValid = async (role = "") => {
  //busca si existe el role
  const existeRole = await Role.findOne({ role });
  // si no existe el role
  if (!existeRole) {
    throw new Error(`el role ${role} no existe`);
  }
};

const emailValidator = async(correo = "") => {
  //verificar si correo existe con express validator
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`el correo ${correo} ya existe en la base de datos`);
  }
}

const isUserbyID = async ( id ) => {
  //validación que determine si el id es valido diferente a la que colocamos en las rutas y colocándola en los validadores.
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    const existeUsuario = await Usuario.findById( id ).exec();
    if ( !existeUsuario ) {
        throw new Error(`El id ${ id } no existe`);
    }
} else {
    throw new Error(`${ id } no es un ID válido`);
}
}

module.exports = { isRoleValid, emailValidator, isUserbyID };