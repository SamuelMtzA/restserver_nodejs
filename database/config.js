//configuracion de la base de datos

const mongoose = require('mongoose');

const dbConnecction = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS, (
            useNewUrlParser = true,
            useUnifiedTopology = true,
            useCreateIndex = true,
            useFindAndModify = false
        ));
        console.log('Conectado a MongoDB Atlas');
    }catch(err){
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = dbConnecction;
