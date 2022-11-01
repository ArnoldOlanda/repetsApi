"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    usuario_owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    usuario_recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    mensajes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Mensaje'
        }],
    ultimo_mensaje: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Mensaje'
    }
});
ChatSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, password, _id } = _a, chat = __rest(_a, ["__v", "password", "_id"]);
    chat.uid = _id;
    return chat;
};
exports.default = (0, mongoose_1.model)('Chat', ChatSchema);
//# sourceMappingURL=chat.js.map