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
const CategoriaSchema = new mongoose_1.Schema({
    categoria: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});
CategoriaSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, categoria = __rest(_a, ["__v", "_id"]);
    categoria.uid = _id;
    return categoria;
};
const Categoria = (0, mongoose_1.model)('Categoria', CategoriaSchema);
exports.default = Categoria;
//# sourceMappingURL=categoria.js.map