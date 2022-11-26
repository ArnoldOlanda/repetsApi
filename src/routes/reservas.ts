import { Router } from 'express'
import { check } from 'express-validator'



import { 
    //validarJWT, 
    validarCampos
} from '../middlewares'
import { existePethouseId, existePetId, existeReservaId, existeUsuarioId } from '../helpers/dbValidator';
import { actualizarEstadoReserva, listadoReservas, obtenerReserva, registrarReserva } from '../services/reservas';

const router = Router();

router.get('/',listadoReservas)
router.get('/:id',[
    check('id').isMongoId(),
    check('id').custom( existeReservaId ),
    validarCampos
],obtenerReserva)

router.post    ('/',[
    check('fecha_solicitud').not().isEmpty(),
    check('fecha_reserva').not().isEmpty(),
    check('usuario').isMongoId(),
    check('usuario').custom( existeUsuarioId ),
    check('pethouse').isMongoId(),
    check('pethouse').custom( existePethouseId ),
    check('mascota').isMongoId(),
    check('mascota').custom( existePetId ),
    check('costo_total').isNumeric(),
    validarCampos
],registrarReserva );

router.patch('/:id',[
    check('id').isMongoId(),
    check('id').custom( existeReservaId ),
    check('estado').isString(), //TODO: obtener los estados aceptados de la bd
    validarCampos
],actualizarEstadoReserva);



export default router;