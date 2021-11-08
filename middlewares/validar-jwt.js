//creacion de middleware para validar el token
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    //obtenemos el token del header
    const token = req.header('x-token');
    //si no existe el token, se devuelve un status 401
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }
    // validacion con el jwt
    try{
        // si alguien manda un uid manipulado
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        //verificar si el uid tiene estado false   
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido, usuario no existe en db'
            });
        }

        //verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no valido - usuario con estado: false'
            });
        }

        req.usuario = usuario
        
        next();
    }catch(e){
        console.log(e);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    // console.log(token);

    

}


module.exports = {
    validarJWT
}