"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const dbValidator_1 = require("../helpers/dbValidator");
const middlewares_1 = require("../middlewares");
const users_1 = require("../services/users");
const router = (0, express_1.Router)();
// router.get    ('/',[ validarJWT ], getUser )
router.get('/', users_1.getUser);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellido', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El campo es obligatorio').isString(),
    (0, express_validator_1.check)('correo', 'El campo tiene que ser un correo valido').isEmail(),
    (0, express_validator_1.check)('correo').custom(dbValidator_1.emailExiste),
    (0, express_validator_1.check)('password', 'El campo es obligatorio').isLength({ min: 8 }),
    (0, express_validator_1.check)('google', 'El campo es obligatorio').isBoolean(),
    (0, express_validator_1.check)('rol').custom(dbValidator_1.esRoleValido),
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], users_1.postUser);
router.patch('/verifyAccount', [
    (0, express_validator_1.check)('id', 'Este campo debe ser un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('generateCode', 'Este campo debe ser un numero').isNumeric(),
    (0, express_validator_1.check)('givenCode', 'Este campo debe ser un numero').isNumeric(),
    middlewares_1.validarCampos
], users_1.patchVerifyNewUser);
router.patch('/:id', [
    //@ts-ignore
    //validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('nombre', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellido', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El campo es obligatorio').not().isEmpty(),
    // check('correo','No es un correo valido').isEmail(),
    // check('correo').custom(emailExiste),
    middlewares_1.validarCampos
], users_1.putUser);
router.put('/photo/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    middlewares_1.validarCampos
], users_1.updatePhotoUser);
router.put('/notification_token/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('token').not().isEmpty(),
    middlewares_1.validarCampos
], users_1.setNotificationToken);
router.put('/favorites/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('pethouseId').isMongoId(),
    (0, express_validator_1.check)('pethouseId').custom(dbValidator_1.existePethouseId),
    middlewares_1.validarCampos
], users_1.updateFavoritesPethouses);
router.delete('/:id', [
    //@ts-ignore
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    middlewares_1.validarCampos
], users_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map