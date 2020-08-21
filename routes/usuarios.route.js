/**
 *  
 *      PATH "/api/usuarios"
 * 
 */


const { Router } = require('express');
const { getUsuarios,createUsuarios,updateUsuario,deleteUsuario } = require('../controlers/usuario.controlers')
const { validarCampos } = require('../middlewares/validar-campos')


const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validarjwt');

const router = Router();

router.get('/' ,validarJWT,getUsuarios);

router.post('/' ,[
            check('nombre','el nombre es invalido').not().isEmpty(),
            check('password','el password es invalido').not().isEmpty(),
            check('email','el email es invalido').isEmail(),
            validarCampos
            ],createUsuarios);

router.put('/:id',[
            validarJWT,
            check('nombre','el nombre es invalido').not().isEmpty(),
            check('role','el role es invalido').not().isEmpty(),
            check('email','el email es invalido').isEmail(),
            ],updateUsuario);

router.delete('/:id',validarJWT,deleteUsuario);



module.exports = router;