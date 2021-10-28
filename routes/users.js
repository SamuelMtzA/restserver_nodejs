//todo
const { Router } = require("express");
//validar el correo y la contraseña
const { check } = require("express-validator");
// const Role = require("../models/role");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/users");
const { isRoleValid, emailValidator, isUserbyID } = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();

//endpoints
router.get("/", usuariosGet);
//hacer referencia a cualquier id, creando middlewares
router.put("/:id",[
  check("id", "No es un ID valido").isMongoId(),
  check('id').custom(id => isUserbyID(id)),
  check('role').custom(role => isRoleValid(role) ),
  validarCampos,
], usuariosPut);
//check es un middleware, y se ejectuta despues de la ruta
router.post("/", [
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('password', 'el pasword es obligatorio y debe tener mas de 6 letras').isLength({ min:6 }),
  check('correo', 'el correo no es valido').isEmail(),
  check('correo').custom(correo => emailValidator(correo)),
  //verificacion personalizada
  check('role').custom( role => isRoleValid(role) ),
  // check('role', 'No es un roi permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), validar contra la base de datos
  validarCampos
],usuariosPost);
//ruta para eliminar
router.delete("/:id",[  
  check("id", "No es un ID valido").isMongoId(),
  check('id').custom(isUserbyID),
  validarCampos
  ], usuariosDelete);
router.patch("/",usuariosPatch);

module.exports = router;
