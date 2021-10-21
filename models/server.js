const express = require("express");
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/users';

    //Middlewares, funcion que se ejecuta cuando levantes el servidor
    this.middleware();
    //rutas de la aplicacion
    this.routes();
  }
  middleware(){
      //use es usado para middlewares, directorio publico
      this.app.use(express.static('public'))

      //lectura y parseo del body,cualquier informacion se cambia json
      this.app.use(express.json());

      //Cors, permite o restringe recursos de un pagina web para ser resquets de otro dominio
      this.app.use(cors());
  }
  routes() {
    //configurar rutas con middleware condicional
    this.app.use(this.usuariosPath, require('../routes/users'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en:", this.port);
    });
  }

}

module.exports = Server;
