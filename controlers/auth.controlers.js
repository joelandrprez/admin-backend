const Usuario = require ('../models/usuario.model');

const bcrytp = require ('bcryptjs');
const {response, json} = require('express');
const router = require('../routes/usuarios.route');
const {generarJWT} = require('../helpers/jwt');


const login = async (req,res = response) =>{

    const {email,password} =req.body;

     try{
        // verificar el correo
        const usuarioDB = await Usuario.findOne({ email });
        if( !usuarioDB ){
            return res.status(400).json({
                ok:true,
                msg:'email incorrecto'
            });
        }
        // verificar contaseña
        const validarPass = bcrytp.compareSync(password,usuarioDB.password);

        if( !validarPass ){
            return res.status(400).json({
                ok:'false',
                msg:'contraseña incorrecta'
            });
        }

        const token = await generarJWT(usuarioDB._id);

        res.status(200).json({
            ok:true,
            token
            
        })

     }
     catch(error){
         res.status(400).json({
            ok:false,
            msg:"Error revise el Log"
         });
        console.log(error);
     }
}

module.exports = {
    login
};