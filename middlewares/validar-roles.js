//middleware para forzar a que tengas el role de administrasdor
const { response } = require("express");

const esAdminRole = (req, res =response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: "Se quiere verificar el role, sin verificar el token primero "
        });
    }

    const { role, nombre } = req.usuario;
    //si el usuario no tiene un rol de administrador
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok: false,
            msg: `El usuario ${nombre} no es administrador`
        });
    }
    next();
}
//RECIBIR ARGUMENTOS EN LOS MIDDLEWARES, el resto de los argumentos, usando el operador ... como argumento
//TIENE LOS ROLES ESPECIFICOS PARA REALIZAR LA ACCION
const tieneRole = ( ...roles ) => {
    return (req, res =response, next) => {
        //validacion de token
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: "Se quiere verificar el role, sin verificar el token primero "
            });
        }
        //tratando de llamar un endpoint con un role diferente al que tiene el usuario
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                ok: false,
                msg: `se requiere el role ${roles}`
            });
        }
        next();
    }

}

module.exports = {esAdminRole, tieneRole};