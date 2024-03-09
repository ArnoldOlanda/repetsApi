import { Router } from 'express';
import { check } from 'express-validator';
import passport from 'passport';
import {
  deletePet,
  getPets,
  getUserPets,
  postPet,
  putPet,
  updateImagePet,
} from '../services/pets';

import { validarCampos } from '../middlewares';
import { existePetId, existeUsuarioId } from '../helpers/dbValidator';

const router = Router();
router.use(passport.authenticate('jwt', { session: false }));
router.get('/', getPets);

router.get(
  '/:id',
  [check('id').isMongoId(), check('id').custom(existeUsuarioId), validarCampos],
  getUserPets
);

router.post(
  '/',
  [
    check('propietarioUid').isMongoId(),
    check('propietarioUid').custom(existeUsuarioId),
    check('nombre', 'El campo es obligatorio').not().isEmpty(),
    check('tipo', 'El campo es obligatorio').not().isEmpty(),
    check('raza', 'El campo es obligatorio').not().isEmpty(),
    check('edad', 'El campo es obligatorio').not().isEmpty(),
    check('descripcion', 'El campo es obligatorio').not().isEmpty(),
    check('caracteristicas').isArray(),
    check('caracteristicas.*').isString(),
    validarCampos, //Captura todos los errores y los muestra
  ],
  postPet
);

router.put(
  '/:id',
  [
    check('id').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('nombre', 'El campo es obligatorio').not().isEmpty(),
    check('tipo', 'El campo es obligatorio').not().isEmpty(),
    check('raza', 'El campo es obligatorio').not().isEmpty(),
    check('edad', 'El campo es obligatorio').not().isEmpty(),
    check('descripcion', 'El campo es obligatorio').not().isEmpty(),
    check('caracteristicas').isArray(),
    check('caracteristicas.*').isString(),
    validarCampos, //Captura todos los errores y los muestra
  ],
  putPet
);

router.patch(
  '/updateImage/:id',
  [
    check('id', 'El campo debe ser un id valido').isMongoId(),
    check('id', 'El id no es valido').custom(existePetId),
    validarCampos,
  ],
  updateImagePet
);

router.delete(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existePetId),
    validarCampos,
  ],
  deletePet
);

export default router;
