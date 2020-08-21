require('dotenv').config();

const express = require ('express');
var cors = require('cors')

const { dbConnection } = require ('./database/config')


//crear servidor de express
const app = express();
app.use(express.json());
app.use( cors(

));
// antes para que le de el formato en json



//administrador
//ADOtata159
dbConnection();

// variables de entorno listado de todas
// console.log(process.env);

// RUTAS 
app.use('/api/usuarios',require('./routes/usuarios.route'));
app.use('/api/login',require('./routes/auth.rote'));




app.listen(process.env.PORT,()=>{
    console.log('se levanto el servidor en el puerto ',process.env.PORT);
});












