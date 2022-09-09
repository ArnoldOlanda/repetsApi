"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const categorias_1 = require("../services/categorias");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
//@ts-ignore
router.get('/', middlewares_1.validarJWT, categorias_1.getCategoria);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'El nombre de la categoria debe ser una cadena').isString(),
    middlewares_1.validarCampos
], categorias_1.postCategoria);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'El id de la categoria debe ser un id de mongo').isMongoId(),
    (0, express_validator_1.check)('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    middlewares_1.validarCampos
], categorias_1.putCategoria);
router.put('/activate/:id', [
    (0, express_validator_1.check)('id', 'El id de la categoria debe ser un id de mongo').isMongoId(),
    middlewares_1.validarCampos
], categorias_1.activate);
router.put('/deactivate/:id', [
    (0, express_validator_1.check)('id', 'El id de la categoria debe ser un id de mongo').isMongoId(),
    middlewares_1.validarCampos
], categorias_1.deactivate);
exports.default = router;
//# sourceMappingURL=categorias.js.map