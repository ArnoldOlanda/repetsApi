import { Router } from 'express'
import { check } from 'express-validator'
import { deletePet, getPets, postPet, putPet } from '../services/pets';


import { 
    //validarJWT, 
    validarCampos
} from '../middlewares'
import { existePetId, existeUsuarioId } from '../helpers/dbValidator';

const router = Router();

// router.get    ('/',[ validarJWT ], getUser )
router.get    ('/', getPets )


router.post   ('/:id',[
    check('id').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('tipo','El campo es obligatorio').not().isEmpty(),
    check('raza','El campo es obligatorio').not().isEmpty(),
    check('edad','El campo es obligatorio').not().isEmpty(),
    check('descripcion','El campo es obligatorio').not().isEmpty(),
    check('caracteristicas').isArray(),
    check('caracteristicas.*').isString(),
    validarCampos //Captura todos los errores y los muestra
], postPet )

router.put   ('/:id',[
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('tipo','El campo es obligatorio').not().isEmpty(),
    check('tipo').isArray(),
    check('tipo.*').isString(),
    check('raza','El campo es obligatorio').not().isEmpty(),
    check('edad','El campo es obligatorio').not().isEmpty(),
    check('descripcion','El campo es obligatorio').not().isEmpty(),
    validarCampos //Captura todos los errores y los muestra
], putPet )

router.patch('/updateImage/:id',[
    check('id','El campo debe ser un id valido').isMongoId(),
    //TODO: terminar la implementacion del servicio de actualizacion de imagen
],)


router.delete ('/:id',[
    //validarJWT,
    check( 'id','No es un ID valido' ).isMongoId(),
    check( 'id' ).custom( existePetId ),
    validarCampos
], deletePet )

export default router;