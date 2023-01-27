//---
import { Router } from 'express'
import { check } from 'express-validator'

import { 
    validarCampos
    //validarJWT, 
} from '../middlewares'
import { existeUsuarioId } from '../helpers/dbValidator';
import { subscriptionStatus, renewSubscription } from '../services/subscriptions';
//---

const router = Router();

// router.get('/',listadoReservas)

router.get('/status/:id',[
   check("id").isMongoId(),
   check("id").custom( existeUsuarioId ),
   validarCampos 
],subscriptionStatus)

router.put('/renew/:id',[
    check("id").isMongoId(),
    check("id").custom( existeUsuarioId ),
    check("newSubscriptionDate").not().isEmpty(),
    validarCampos
],renewSubscription );

// router.patch('/:id',[

// ],actualizarEstadoReserva);



export default router;