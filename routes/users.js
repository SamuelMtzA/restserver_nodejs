//todo
const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/users");

const router = Router();

//endpoints
router.get("/", usuariosGet);
//hacer referencia a cualquier id
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", usuariosDelete);
router.patch("/", usuariosPatch);

module.exports = router;
