import { Router } from 'express'
import { check } from 'express-validator'
import { deletePetHouse, getPetHouse,getPetHouseOne,postPetHouse, putPetHouse, updateGalleryPetHouse } from '../services/petHouses';


import { 
    //validarJWT, 
    validarCampos
} from '../middlewares'
import { existePethouseId, existeUsuarioId } from '../helpers/dbValidator';



const router = Router();


// router.get    ('/:lat/:long', getPetHouse )
router.get    ('/', getPetHouse );

router.get('/:id',[
    check('id').isMongoId(),
    check('id').custom( existePethouseId ),
    validarCampos
], getPetHouseOne);

router.post   ('/',[
    check('nombre').not().isEmpty(),
    // check('descripcion').not().isEmpty(),
    check('distrito','El campo es obligatorio').not().isEmpty(),
    check('provincia','El campo es obligatorio').not().isEmpty(),
    check('propietario','El campo es obligatorio').isMongoId(),
    check('propietario').custom( existeUsuarioId ),
    check('tipo_mascotas','El campo debe ser un id de categoria valido').not().isEmpty(), //Tipo mascota
    check('tamanio_mascotas','El campo es obligatorio').not().isEmpty(),
    check('tipo_alojamiento','El campo es obligatorio').not().isEmpty(),
    //check('coordenadas','El campo debe ser un objeto').isObject(),
    //check('direccion','El campo es obligatorio').not().isEmpty(),
    // check('celular','El campo debe contener al menos 9 digitos').isLength({ min:9 }),
    // check('tarifa_hora','El campo es obligatorio').not().isEmpty(),
    // check('tarifa_dia','El campo es obligatorio').not().isEmpty(),
    validarCampos //Captura todos los errores y los muestra
], postPetHouse )

router.put('/:id',[
    check('id').isMongoId(),
    check('id').custom( existePethouseId ), 
    validarCampos
],updateGalleryPetHouse)

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