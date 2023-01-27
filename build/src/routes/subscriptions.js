"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//---
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const dbValidator_1 = require("../helpers/dbValidator");
const subscriptions_1 = require("../services/subscriptions");
//---
const router = (0, express_1.Router)();
// router.get('/',listadoReservas)
router.get('/status/:id', [
    (0, express_validator_1.check)("id").isMongoId(),
    (0, express_validator_1.check)("id").custom(dbValidator_1.existeUsuarioId),
    middlewares_1.validarCampos
], subscriptions_1.subscriptionStatus);
router.put('/renew/:id', [
    (0, express_validator_1.check)("id").isMongoId(),
    (0, express_validator_1.check)("id").custom(dbValidator_1.existeUsuarioId),
    (0, express_validator_1.check)("newSubscriptionDate").not().isEmpty(),
    middlewares_1.validarCampos
], subscriptions_1.renewSubscription);
// router.patch('/:id',[
// ],actualizarEstadoReserva);
exports.default = router;
//# sourceMappingURL=subscriptions.js.map