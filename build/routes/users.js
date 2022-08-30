"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
// const { existeUsuarioId } = require ('../helpers/dbValidator')
const dbValidator_1 = require("../helpers/dbValidator");
const router = (0, express_1.Router)();
// router.get    ('/',[ validarJWT ], getUser )
router.get('/', users_1.getUser);
router.post('/', [
    middlewares_1.validarCampos //Captura todos los errores y los muestra
], users_1.postUser);
router.delete('/:id', [
    middlewares_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID valido').isNumeric(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeUsuarioId),
    middlewares_1.validarCampos
], users_1.deleteUser);
exports.default = router;
