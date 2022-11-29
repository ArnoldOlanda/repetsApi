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
const ReservaSchema = new mongoose_1.Schema({
    fecha_solicitud: {
        type: Date,
        required: true
    },
    fecha_reserva: {
        type: Date,
        required: true
    },
    duracion_dias: Number,
    duracion_horas: Number,
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    pethouse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'PetHouse'
    },
    mascota: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Pet'
    },
    costo_total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'espera'
    }
});
ReservaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, reserva = __rest(_a, ["__v", "_id"]);
    reserva.uid = _id;
    return reserva;
};
exports.default = (0, mongoose_1.model)('Reserva', ReservaSchema);
//# sourceMappingURL=reserva.js.map