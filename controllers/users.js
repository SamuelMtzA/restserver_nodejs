const { reponse, request } = require("express");
//libreria para encriptar contraseñas
const bcrypt = require("bcryptjs");
//para exportar y crear instancias del usuario
const Usuario = require("../models/usuario");
//validacion de los datos
// const { validationResult } = require("express-validator");

const usuariosGet = (req = request, res = reponse) => {
  const {q, nombre, limit = 10} = req.query;
  res.json({
    msg: "get API -controlador",
    q,
    nombre,
    limit
  });
};

const usuariosPost = async(req, res = reponse) => {
  
  //respuesta desde el body
  const {nombre, correo, password, role} = req.body;
  //creacion de la instancia del usuario
  const usuario = new Usuario({nombre, correo, password, role});
  
  //verificar si correo existe con express validator
  const existeCorreo = await Usuario.findOne({correo});
  if (existeCorreo) {
    return res.status(400).json({msg: "El correo ya existe"});
  }


  //encriptacion de la contraseña, salt numero de vueltas de encriptacion
  const salt = await bcrypt.genSalt(10);
  usuario.password = bcrypt.hashSync(password, salt);




  //guardar en la base de datos de mongo 
  await usuario.save();

  res.json({
    // msg: "post API -controlador",
    usuario,
  });
};

const usuariosPut = (req, res = reponse) => {
  //id viene en los params ya parseado
  const { id } = req.params;
  res.json({
    msg: "put API -controlador",
    id,
  });
};

const usuariosDelete = (req, res = reponse) => {
  res.json({
    msg: "delete API -controlador",
  });
};

const usuariosPatch = (req, res = reponse) => {
    res.json({
      msg: "patch API -controlador",
    });
  };
module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut
};
