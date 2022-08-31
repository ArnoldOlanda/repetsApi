
import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../middlewares';
import { login } from '../services/auth';


const router = Router();

router.post ('/login',
    check('usuario','El correo es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
, login )


export default router;