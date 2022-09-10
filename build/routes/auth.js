"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const auth_1 = require("../services/auth");
const router = (0, express_1.Router)();
router.post('/login', (0, express_validator_1.check)('usuario', 'El correo es obligatorio').not().isEmpty(), (0, express_validator_1.check)('password', 'La contraseña es obligatoria').not().isEmpty(), middlewares_1.validarCampos, auth_1.login);
router.post('/google', (0, express_validator_1.check)('id_token', 'id_token es necesario').not().isEmpty(), middlewares_1.validarCampos, auth_1.googleSignIn);
exports.default = router;
//# sourceMappingURL=auth.js.map