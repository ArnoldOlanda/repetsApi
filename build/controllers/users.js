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
exports.deleteUser = exports.postUser = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const { limite = 5, desde = 0 } = req.query;
    try {
        const data = yield usuario_1.default.listar();
        return res.json({
            data
        });
    }
    catch (error) {
        return;
    }
});
exports.getUser = getUser;
const postUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { nombre, usuario, password, direccion } = req.body
        const salt = bcryptjs_1.default.genSaltSync();
        // const password_ = bcryptjs.hashSync( password, salt )
        console.log(salt);
        yield usuario_1.default.registrar();
        return res.json({
            msg: "Usuario registrado"
        });
    }
    catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar registrar al usuario hable con el administrador"
        });
    }
});
exports.postUser = postUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield usuario_1.default.eliminar(id);
        if (!user) {
            return res.status(400).json({
                err: "Ocurrio un error al intentar eliminar al usuario hable con el administrador"
            });
        }
        return res.json({
            msg: "Usuario eliminado"
        });
    }
    catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar eliminar al usuario hable con el administrador"
        });
    }
});
exports.deleteUser = deleteUser;
