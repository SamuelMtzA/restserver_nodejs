const { reponse, request } = require("express");

const usuariosGet = (req = request, res = reponse) => {
  const {q, nombre, limit = 10} = req.query;
  res.json({
    msg: "get API -controlador",
    q,
    nombre,
    limit
  });
};

const usuariosPost = (req, res = reponse) => {
  //respuesta desde el body
  const body = req.body;

  res.json({
    msg: "post API -controlador",
    body,
  });
};

const usuariosPut = (req, res = reponse) => {
  //id viene en los params ya parseado
  const {id} = req.params;
  res.json({
    msg: "put API -controlador",
    id
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
