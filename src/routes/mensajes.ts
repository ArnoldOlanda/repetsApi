import { Router } from 'express'
import { check } from 'express-validator'
import { getChats, getMensajes } from '../services/mensajes';

import { 
    validarJWT, 
    validarCampos
} from '../middlewares'



const router = Router();

//@ts-ignore
router.get('/chats/:id', getChats);
router.get ('/:emisor/:receptor', getMensajes );




export default router;