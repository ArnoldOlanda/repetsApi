import { Router } from 'express'
import { check } from 'express-validator'
import { deletePetHouse, getPetHouse,postPetHouse, putPetHouse } from '../services/petHouses';


import { 
    //validarJWT, 
    validarCampos
} from '../middlewares'
import { existePethouseId } from '../helpers/dbValidator';



const router = Router();

// router.get    ('/',[ validarJWT ], getUser )
router.get    ('/', getPetHouse )


router.post   ('/',[
    check('distrito','El campo es obligatorio').not().isEmpty(),
    check('provincia','El campo es obligatorio').not().isEmpty(),
    check('direccion','El campo es obligatorio').not().isEmpty(),
    check('coordenadas','El campo debe ser un objeto').isObject(),
    check('celular','El campo debe contener al menos 9 digitos').isLength({ min:9 }),
    check('propietario','El campo es obligatorio').not().isEmpty(),
    check('tarifa_hora','El campo es obligatorio').not().isEmpty(),
    check('tarifa_dia','El campo es obligatorio').not().isEmpty(),
    check('categorias','El campo debe ser un arreglo').isArray(),
    check('categorias.*','El campo debe ser un ID valido').isMongoId(),
    validarCampos //Captura todos los errores y los muestra
], postPetHouse )

router.put   ('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('distrito','El campo es obligatorio').not().isEmpty(),
    check('provincia','El campo es obligatorio').not().isEmpty(),
    check('direccion','El campo es obligatorio').not().isEmpty(),
    check('coordenadas','El campo debe ser un objeto').isObject(),
    check('celular','El campo debe contener al menos 9 digitos').isLength({ min:9 }),
    check('propietario','El campo es obligatorio').not().isEmpty(),
    check('tarifa_hora','El campo es obligatorio').not().isEmpty(),
    check('tarifa_dia','El campo es obligatorio').not().isEmpty(),
    check('categorias','El campo debe ser un arreglo').isArray(),
    check('categorias.*','El campo debe ser un ID valido').isMongoId(),
    validarCampos //Captura todos los errores y los muestra
], putPetHouse )


router.delete ('/:id',[
    //validarJWT,
    check( 'id','No es un ID valido' ).isMongoId(),
    check( 'id' ).custom( existePethouseId ),
    validarCampos
], deletePetHouse )

export default router;