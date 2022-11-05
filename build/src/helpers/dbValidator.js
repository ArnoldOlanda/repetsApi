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
exports.existeReservaId = exports.existePetId = exports.existePethouseId = exports.existeUsuarioId = exports.emailExiste = exports.esRoleValido = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const role_1 = __importDefault(require("../models/role"));
const petHouse_1 = __importDefault(require("../models/petHouse"));
const pet_1 = __importDefault(require("../models/pet"));
const reserva_1 = __importDefault(require("../models/reserva"));
const esRoleValido = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield role_1.default.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
});
exports.esRoleValido = esRoleValido;
//Validar correo si existe
const emailExiste = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("aqui");
    const existe = yield usuario_1.default.findOne({ correo });
    if (existe)
        throw new Error(`El correo ${correo} ya esta registrado por otro usuario`);
});
exports.emailExiste = emailExiste;
//Validar usuario si no existe
const existeUsuarioId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield usuario_1.default.findById(id);
    if (!existe)
        throw new Error(`No existe el usuario con id : ${id}.`);
});
exports.existeUsuarioId = existeUsuarioId;
//Validar pethouse si no existe
const existePethouseId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield petHouse_1.default.findById(id);
    if (!existe)
        throw new Error(`No existe la PetHouse con id : ${id}.`);
});
exports.existePethouseId = existePethouseId;
//Validar mascota si no existe
const existePetId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield pet_1.default.findById(id);
    if (!existe)
        throw new Error(`No existe la Mascota con id : ${id}.`);
});
exports.existePetId = existePetId;
const existeReservaId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existe = yield reserva_1.default.findById(id);
    if (!existe)
        throw new Error(`No existe una reserva con id: ${id}.`);
});
exports.existeReservaId = existeReservaId;
//# sourceMappingURL=dbValidator.js.map