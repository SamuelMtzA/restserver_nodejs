const { validationResult } = require("express-validator");

//si pasa el middleware, se ejecuta el siguiente middleware con next
const validarCampos = (req, res, next) => {
  //validacion si es un correo permitido con formato especifico
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

module.exports = validarCampos;
