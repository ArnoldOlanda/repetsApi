import { Router } from 'express'
import { check } from 'express-validator'
import { getUser, postUser, deleteUser } from '../services/users';

import { validarJWT, validarCampos} from '../middlewares'


// const { existeUsuarioId } = require ('../helpers/dbValidator')
import { existeUsuarioId } from '../helpers/dbValidator'

const router = Router();

// router.get    ('/',[ validarJWT ], getUser )
router.get    ('/', getUser )


router.post   ('/',[
    validarCampos //Captura todos los errores y los muestra
], postUser )


router.delete ('/:id',[
    validarJWT,
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
], deleteUser )

export default router;