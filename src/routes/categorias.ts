import { Router } from 'express';
import { check } from 'express-validator';
import passport from 'passport';

import {
  activate,
  deactivate,
  getCategoria,
  postCategoria,
  putCategoria,
} from '../services/categorias';
import { validarCampos } from '../middlewares';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));

router.get('/', getCategoria);

router.post(
  '/',
  [
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre de la categoria debe ser una cadena').isString(),
    validarCampos,
  ],
  postCategoria
);

router.put(
  '/:id',
  [
    check('id', 'El id de la categoria debe ser un id de mongo').isMongoId(),
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  putCategoria
);

router.put(
  '/activate/:id',
  [
    check('id', 'El id de la categoria debe ser un id de mongo').isMongoId(),
    validarCampos,
  ],
  activate
);

router.put(
  '/deactivate/:id',
  [
    check('id', 'El id de la categoria debe ser un id de mongo').isMongoId(),
    validarCampos,
  ],
  deactivate
);

export default router;
