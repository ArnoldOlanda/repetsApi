"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const petHouses_1 = require("../services/petHouses");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// router.get    ('/',[ validarJWT ], getUser )
router.get('/', petHouses_1.getPetHouse);
router.post('/', [
    (0, express_validator_1.check)('distrito', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('provincia', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('direccion', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('celular', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('propietario', 'El campo es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('categorias', 'El campo es obligatorio').isArray().isMongoId(),
    (0, express_validator_1.check)('tarifa_hora', 'El campo es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], petHouses_1.postPetHouse);
// router.delete ('/:id',[
//     validarJWT,
//     check( 'id','No es un ID valido' ).isNumeric(),
//     check( 'id' ).custom( existeUsuarioId ),
//     validarCampos
// ], deleteUser )
exports.default = router;
//# sourceMappingURL=petHouses.js.map