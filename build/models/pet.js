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
const PetSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    especie: {
        type: String,
        required: [true, "La especie es obligatoria"],
    },
    raza: {
        type: String,
        required: [true, "La raza es obligatoria"]
    },
    comportamiento: [{ type: String, }],
    tamaño: { type: String, },
    img: { type: String, },
});
PetSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, pet = __rest(_a, ["__v", "_id"]);
    pet.uid = _id;
    return pet;
};
exports.default = (0, mongoose_1.model)('Pet', PetSchema);
//# sourceMappingURL=pet.js.map