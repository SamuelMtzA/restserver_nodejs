//todo
const { Router } = require("express");
//validar el correo y la contraseña
const { check } = require("express-validator");
const Role = require("../models/role");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/users");
const validarCampos = require("../middlewares/validar-campos");

const router = Router();

//endpoints
router.get("/", usuariosGet);
//hacer referencia a cualquier id
router.put("/:id", usuariosPut);
//check es un middleware, y se ejectuta despues de la ruta
router.post("/", [
  check('nombre', 'el nombre es obligatorio').not().isEmpty(),
  check('password', 'el pasword es obligatorio y debe tener mas de 6 letras').isLength({ min:6 }),
  check('correo', 'el correo no es valido').isEmail(),
  //verificacion personalizada
  check('role').custom( async(role = '') => {
    //busca si existe el role
    const existeRole = await Role.findOne({ role });
    // si no existe el role
    if (!existeRole) {
      throw new Error(`el role ${role} no existe`);
    }
  }),
  // check('role', 'No es un roi permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), validar contra la base de datos
  validarCampos
],usuariosPost);
router.delete("/", usuariosDelete);
router.patch("/", usuariosPatch);

module.exports = router;
