const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async ()=>{
    //cadena de conexion
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
           
        });
        console.log('conectado a la MONGO ATLAS');
    }catch(error){
    console.log('Error no se pudo crear la base')
    }
};

module.exports = {
    dbConnection
}