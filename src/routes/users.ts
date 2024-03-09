import { Router } from 'express';
import { check } from 'express-validator';

import {
  emailExiste,
  esRoleValido,
  existePethouseId,
  existeUsuarioId,
} from '../helpers/dbValidator';
import { validarJWT, validarCampos } from '../middlewares';
import {
  getUser,
  postUser,
  patchVerifyNewUser,
  deleteUser,
  putUser,
  updatePhotoUser,
  setNotificationToken,
  updateFavoritesPethouses,
} from '../services/users';

const router = Router();

router.get('/', getUser);

router.post(
  '/',
  [
    check('nombre', 'El campo es obligatorio').not().isEmpty(),
    check('apellido', 'El campo es obligatorio').not().isEmpty(),
    check('celular', 'El campo es obligatorio').isString(),
    check('correo', 'El campo tiene que ser un correo valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El campo es obligatorio').isLength({ min: 8 }),
    check('google', 'El campo es obligatorio').isBoolean(),
    check('rol').custom(esRoleValido),
    validarCampos, //Captura todos los errores y los muestra
  ],
  postUser
);

router.patch(
  '/verifyAccount',
  [
    check('id', 'Este campo debe ser un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('generateCode', 'Este campo debe ser un numero').isNumeric(),
    check('givenCode', 'Este campo debe ser un numero').isNumeric(),
    validarCampos,
  ],
  patchVerifyNewUser
);

router.patch(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('nombre', 'El campo es obligatorio').not().isEmpty(),
    check('apellido', 'El campo es obligatorio').not().isEmpty(),
    check('celular', 'El campo es obligatorio').not().isEmpty(),
    // check('correo','No es un correo valido').isEmail(),
    // check('correo').custom(emailExiste),
    validarCampos,
  ],
  putUser
);

router.put(
  '/photo/:id',
  [check('id').isMongoId(), check('id').custom(existeUsuarioId), validarCampos],
  updatePhotoUser
);

router.put(
  '/notification_token/:id',
  [
    check('id').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('token').not().isEmpty(),
    validarCampos,
  ],
  setNotificationToken
);

router.put(
  '/favorites/:id',
  [
    check('id').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('pethouseId').isMongoId(),
    check('pethouseId').custom(existePethouseId),
    validarCampos,
  ],
  updateFavoritesPethouses
);

router.delete(
  '/:id',
  [
    //@ts-ignore
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos,
  ],
  deleteUser
);

export default router;
