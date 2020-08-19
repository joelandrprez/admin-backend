const express = require ('express');
var cors = require('cors')

require('dotenv').config();

const { dbConnection } = require ('./database/config')


//crear servidor de express
const app = express();

//administrador
//ADOtata159
dbConnection();

// variables de entorno listado de todas
console.log(process.env);

// RUTAS 
app.get('/' ,(req,res)=> {
    res.status(401).json({
        rtpa:'ok',
        bod:'405'
    });
});


app.listen(process.env.PORT,()=>{
    console.log('se levanto el servidor en el puerto ',process.env.PORT);
});












