"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const pets_1 = require("../services/pets");
const middlewares_1 = require("../middlewares");
const dbValidator_1 = require("../helpers/dbValidator");
const router = (0, express_1.Router)();
// router.get    ('/',[ validarJWT ], getUser )
router.get('/', pets_1.getPets);
router.get('/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    middlewares_1.validarCampos,
], pets_1.getUserPets);
router.post('/', [
    (0, express_validator_1.check)('propietarioUid').isMongoId(),
    (0, express_validator_1.check)('propietarioUid').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('nombre', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('raza', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('edad', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('caracteristicas').isArray(),
    (0, express_validator_1.check)('caracteristicas.*').isString(),
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], pets_1.postPet);
router.put('/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('nombre', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tipo', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('raza', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('edad', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('descripcion', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('caracteristicas').isArray(),
    (0, express_validator_1.check)('caracteristicas.*').isString(),
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], pets_1.putPet);
router.patch('/updateImage/:id', [
    (0, express_validator_1.check)('id', 'El campo debe ser un id valido').isMongoId(),
    //TODO: terminar la implementacion del servicio de actualizacion de imagen
]);
router.delete('/:id', [
    //validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existePetId),
    middlewares_1.validarCampos
], pets_1.deletePet);
exports.default = router;
//# sourceMappingURL=pets.js.map