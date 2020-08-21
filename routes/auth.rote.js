/**
 *  
 *      PATH "/api/login"
 * 
 */
const { Router } = require('express');
const { check } = require('express-validator')

const { validarCampos } =require ('../middlewares/validar-campos');
const { login } = require ('../controlers/auth.controlers');



const router = Router();

router.post('/',[
    check('password','el password es invalido').not().isEmpty(),
    check('email','el email es invalido').isEmail(),
    validarCampos
    ],login);


module.exports = router;




