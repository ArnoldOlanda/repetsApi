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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.putPet = exports.postPet = exports.getUserPets = exports.getPets = void 0;
const pet_1 = __importDefault(require("../models/pet"));
const getPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield pet_1.default.find();
        return res.json({
            data
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getPets = getPets;
const getUserPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const pets = yield pet_1.default.find({ propietarioUid: id });
        return res.json({
            data: pets
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al obtener la informacion, hable con el administrador"
        });
    }
});
exports.getUserPets = getUserPets;
// Registrar nuevo usuario
const postPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newPet = new pet_1.default(data);
        const savedPet = yield newPet.save();
        return res.json({
            msg: "ok - Mascota registrada",
            pet: savedPet,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        });
    }
});
exports.postPet = postPet;
const putPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const pet = yield pet_1.default.findByIdAndUpdate(id, data);
        return res.json({
            msg: "ok - Mascota actualizada",
            pet
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        });
    }
});
exports.putPet = putPet;
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pet = yield pet_1.default.findByIdAndUpdate(id, { estado: false });
        if (!pet) {
            return res.status(400).json({
                err: "Error al eliminar, hable con el administrador"
            });
        }
        return res.json({
            msg: "Mascota eliminada"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        });
    }
});
exports.deletePet = deletePet;
//# sourceMappingURL=pets.js.map