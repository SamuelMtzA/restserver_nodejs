const { reponse, request } = require("express");
//libreria para encriptar contraseñas
const bcrypt = require("bcryptjs");
//para exportar y crear instancias del usuario
const Usuario = require("../models/usuario");
//validacion de los datos
// const { validationResult } = require("express-validator");

const usuariosGet =async(req = request, res = reponse) => {
  //argumento limit es un string convertir a numero
  const {limit = 5, from = 0} = req.query;
  //indica el estado 
  const query = {estado: true};
  //paginacion
  //contar los registros, realizar las promesas al mismo tiempo
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .limit(Number(limit))
    .skip(Number(from))
  ])

  res.json({
    total, 
    usuarios
  });
};

const usuariosPost = async(req, res = reponse) => {
  
  //respuesta desde el body
  const {nombre, correo, password, role} = req.body;
  //creacion de la instancia del usuario
  const usuario = new Usuario({nombre, correo, password, role});
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

const usuariosPut = async(req, res = reponse) => {
  //id viene en los params ya parseado
  const { id } = req.params;
  //respuesta desde el body
  const { _id, google, password, correo, ...resto} = req.body;

  //todo: validar contra la base de datos
  if(password){
    //encriptacion de la contraseña, salt numero de vueltas de encriptacion
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});


  res.json(
    usuario,
  );
};

const usuariosDelete = async(req, res = reponse) => {
  const {id} = req.params;

  //borrar fisicamente el registro, se pierde el registro
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});
  res.json(usuario);
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
