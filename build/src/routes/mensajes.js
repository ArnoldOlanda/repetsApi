"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mensajes_1 = require("../services/mensajes");
const router = (0, express_1.Router)();
//@ts-ignore
router.get('/chats/:id', mensajes_1.getChats);
router.get('/:emisor/:receptor', mensajes_1.getMensajes);
exports.default = router;
//# sourceMappingURL=mensajes.js.map