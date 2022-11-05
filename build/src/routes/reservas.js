"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const dbValidator_1 = require("../helpers/dbValidator");
const reservas_1 = require("../services/reservas");
const router = (0, express_1.Router)();
router.get('/', reservas_1.listadoReservas);
router.get('/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeReservaId),
    middlewares_1.validarCampos
], reservas_1.obtenerReserva);
router.post('/', [
    (0, express_validator_1.check)('fecha_solicitud').isDate(),
    (0, express_validator_1.check)('fecha_reserva').isDate(),
    (0, express_validator_1.check)('usuario').isMongoId(),
    (0, express_validator_1.check)('usuario').custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)('pethouse').isMongoId(),
    (0, express_validator_1.check)('pethouse').custom(dbValidator_1.existePethouseId),
    (0, express_validator_1.check)('cantidad_mascotas').isNumeric(),
    (0, express_validator_1.check)('costo_total').isNumeric(),
    middlewares_1.validarCampos
], reservas_1.registrarReserva);
router.patch('/:id', [
    (0, express_validator_1.check)('id').isMongoId(),
    (0, express_validator_1.check)('id').custom(dbValidator_1.existeReservaId),
    (0, express_validator_1.check)('estado').isString(),
    middlewares_1.validarCampos
], reservas_1.actualizarEstadoReserva);
exports.default = router;
//# sourceMappingURL=reservas.js.map