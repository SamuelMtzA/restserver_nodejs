//rutas de auntenticacion
const { Router } = require("express");
//validar el correo y la contraseña
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const validarCampos = require("../middlewares/validar-campos");
const router = Router();

//endpoint para el login, llamar al controlador
//check es un middleware que valida los datos que se le pasan
router.post("/login",
[
    check("correo", "Correo Obligatorio").isEmail(),
    check("password", "Contraseña Obligatoria").not().isEmpty(),
    validarCampos
], login);

module.exports = router;