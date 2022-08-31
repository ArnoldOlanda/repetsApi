import { Router } from 'express'
import { check } from 'express-validator'
import { getUser, postUser, deleteUser, patchVerifyNewUser } from '../services/users';

import { validarJWT, validarCampos} from '../middlewares'


// const { existeUsuarioId } = require ('../helpers/dbValidator')
import { existeUsuarioId } from '../helpers/dbValidator'

const router = Router();

// router.get    ('/',[ validarJWT ], getUser )
router.get    ('/', getUser )


router.post   ('/',[
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('apellido','El campo es obligatorio').not().isEmpty(),
    check('celular','El campo es obligatorio').isString(),
    check('email','El campo es obligatorio').isEmail(),
    check('password','El campo es obligatorio').not().isEmpty(),
    check('google','El campo es obligatorio').isBoolean(),
    check('rol','El campo es obligatorio').isNumeric(),
    validarCampos //Captura todos los errores y los muestra
], postUser )

router.patch('/verifyAccount',[
    check('id','Este campo debe ser un numero').isNumeric(),
    check('generateCode','Este campo debe ser un numero').isNumeric(),
    check('givenCode','Este campo debe ser un numero').isNumeric(),
    validarCampos
],patchVerifyNewUser)

router.delete ('/:id',[
    validarJWT,
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
], deleteUser )

export default router;