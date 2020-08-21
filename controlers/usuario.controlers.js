const Usuario = require ('../models/usuario.model')

const bcrypt = require ('bcryptjs');
const { response } = require('express');
const { generarJWT } = require ('../helpers/jwt')

const getUsuarios = async (req,res) =>{

    const usuario = await Usuario.find(); 

    res.json({
        ok:true,
        usuario,
        uid:req.uid
    });
}

const createUsuarios = async (req,res = response) =>{
    const { email , password } = req.body;
    try{

        const existeEmail = await Usuario.findOne({email});

        if(existeEmail){
            return res.status(400).json({
                ok:"false",
                msg:"El correo ya esta registrado"
            });
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password,salt).toString();

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Error inesperado.. revise el log'
        })
    }
}

const updateUsuario  = async(req,res = response)=>{
    const uid = req.params.id;

    try{

        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){

            return res.status(404).json({
                ok:false,
                msg: "No existe el usuario"
            });

        }

        const {password,google,email,...campos} = req.body;

        if(usuarioDb.email !== email){

            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:"ya existe un usuario con ese email"
                });

            }
        }
        
        campos.email = email;
        const usuarioUp = await Usuario.findByIdAndUpdate(uid,campos,{new: true});


        res.json({
            ok:true,
            msg:usuarioUp   
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:true,
            msg:'Error inesperado.. revise el log'
        })
    }
}
const deleteUsuario = async(req,res = response)=> {


    const uid = req.params.id;
    
    try{
        const usuarioDb = await Usuario.findById( uid.replace('"','') );

        if( !usuarioDb ){
            return res.status(404).json({
                ok:false,
                msg:"El usuario no existe"
            });
        

        }
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok:false,
            msg:"usuario eliminado"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado.. revise el log"
        })
    }


}



module.exports = {
    getUsuarios,
    createUsuarios,
    updateUsuario,
    deleteUsuario
}
