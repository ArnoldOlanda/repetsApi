"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePetHouse = exports.putPetHouse = exports.postPetHouse = exports.getPetHouse = void 0;
const petHouse_1 = __importDefault(require("../models/petHouse"));
// Lista de pethouses
const getPetHouse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield petHouse_1.default.find().populate('categorias', { categoria: 1 });
        return res.json({
            data
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getPetHouse = getPetHouse;
// Registrar nueva pethouse
const postPetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = __rest(req.body, []);
        const petHouse = new petHouse_1.default(data);
        yield petHouse.save();
        return res.json({
            msg: "PetHouse registrada",
            petHouse,
        });
    }
    catch (error) {
        //console.log(error);
        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        });
    }
});
exports.postPetHouse = postPetHouse;
const putPetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const petHouse = yield petHouse_1.default.findByIdAndUpdate(id, data);
        return res.json({
            msg: "PetHouse actualizada",
            petHouse,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        });
    }
});
exports.putPetHouse = putPetHouse;
const deletePetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield petHouse_1.default.findByIdAndUpdate(id, { estado: false });
        return res.json({
            msg: "PetHouse eliminada"
        });
    }
    catch (error) {
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        });
    }
});
exports.deletePetHouse = deletePetHouse;
//# sourceMappingURL=petHouses.js.map