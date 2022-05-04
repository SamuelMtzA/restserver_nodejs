//rutas de auntenticacion
const { Router } = require("express");
//validar el correo y la contraseña
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
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

router.post("/google",
[
    check("id_token", "id_token Obligatoria").not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;