//generar el token
const jwt = require ('jsonwebtoken');
//identificador unico del usuario
const generarJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    //no usar informacion sensible
    const payload = { uid };
    //tiempo de expiracion
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1000h'
      },
      (error, token) => {
        if (error) {
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};


module.exports = {
  generarJWT,
};
