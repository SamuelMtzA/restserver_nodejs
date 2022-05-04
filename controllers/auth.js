//funciones para el controlador de autenticacion
const { response } = require("express");
const bcryptjs = require("bcryptjs");
//crear instancias de usuario
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  
  try {
    const usuarioDB = await Usuario.findOne({ correo });
    //si el usuario no existe en la base de datos
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario/password no existe",
      });
    }
    //si el usuario existe en la base de datos pero esta desactivado
    if (!usuarioDB.estado) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario no es correcto - estado: false",
      });
    }
    //verificar el password, el password en la base de datos y el password que se envio, y regresa un boolean
    const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario/password no existe - password",
      });
    }
    // generar el JWT, json web token
    const token = await generarJWT(usuarioDB.id);
    
    res.json({
      ok: true,
      msg: "Usuario autenticado",
      usuarioDB,
      token,
    });
    
  } catch (error) {
    //internal server error
    console.log(error);
    return res.status(500).json({
      message: "Error en la validacion de datos",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  res.json({
    msg: "google sign in",
    id_token,
  });
}

module.exports = {
  login,
  googleSignIn,
};
