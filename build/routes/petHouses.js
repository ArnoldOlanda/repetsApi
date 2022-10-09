"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const petHouses_1 = require("../services/petHouses");
const middlewares_1 = require("../middlewares");
const dbValidator_1 = require("../helpers/dbValidator");
const router = (0, express_1.Router)();
router.get('/:lat/:long', petHouses_1.getPetHouse);
router.post('/', [
    (0, express_validator_1.check)('nombre').not().isEmpty(),
    (0, express_validator_1.check)('distrito', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('provincia', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('coordenadas', 'El campo debe ser un objeto').isObject(),
    (0, express_validator_1.check)('propietario', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('galeria').isArray(),
    (0, express_validator_1.check)('categorias', 'El campo debe ser un arreglo').isArray(),
    (0, express_validator_1.check)('categorias.*', 'El campo debe ser un ID valido').isMongoId(),
    (0, express_validator_1.check)('tipo_alojamiento', 'El campo es obligatorio').not().isEmpty(),
    //check('direccion','El campo es obligatorio').not().isEmpty(),
    // check('celular','El campo debe contener al menos 9 digitos').isLength({ min:9 }),
    // check('tarifa_hora','El campo es obligatorio').not().isEmpty(),
    // check('tarifa_dia','El campo es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], petHouses_1.postPetHouse);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un id valido').isMongoId(),
    (0, express_validator_1.check)('distrito', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('provincia', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('direccion', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('coordenadas', 'El campo debe ser un objeto').isObject(),
    (0, express_validator_1.check)('celular', 'El campo debe contener al menos 9 digitos').isLength({ min: 9 }),
    (0, express_validator_1.check)('propietario', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tarifa_hora', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('tarifa_dia', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('categorias', 'El campo debe ser un arreglo').isArray(),
    (0, express_validator_1.check)('categorias.*', 'El campo debe ser un ID valido').isMongoId(),
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], petHouses_1.putPetHouse);
router.delete('/:id', [
    //validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existePethouseId),
    middlewares_1.validarCampos
], petHouses_1.deletePetHouse);
exports.default = router;
//# sourceMappingURL=petHouses.js.map