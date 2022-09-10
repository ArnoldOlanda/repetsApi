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
exports.deleteUser = exports.putUser = exports.patchVerifyNewUser = exports.postUser = exports.getUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateVerifyCode_1 = require("../helpers/generateVerifyCode");
const sendMail_1 = require("../helpers/sendMail");
const usuario_1 = __importDefault(require("../models/usuario"));
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = _req;
    try {
        const data = yield usuario_1.default.find();
        return res.json({
            data
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getUser = getUser;
// Registrar nuevo usuario
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let _a = req.body, { password } = _a, resto = __rest(_a, ["password"]);
        const salt = bcryptjs_1.default.genSaltSync();
        password = bcryptjs_1.default.hashSync(password, salt);
        const usuario = new usuario_1.default(Object.assign(Object.assign({}, resto), { password }));
        yield usuario.save();
        const verifyCode = (0, generateVerifyCode_1.generateVerifyCode)();
        const { correo } = resto;
        //Enviar correo con codigo de verificacion
        (0, sendMail_1.sendMail)(correo, verifyCode);
        return res.json({
            msg: "Usuario registrado",
            usuario,
            verifyCode
        });
    }
    catch (error) {
        return res.status(400).json({
            err: "Ocurrio un error al intentar registrar al usuario hable con el administrador"
        });
    }
});
exports.postUser = postUser;
const patchVerifyNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, generateCode, givenCode } = req.body;
        console.log(id);
        if (generateCode !== givenCode) {
            return res.status(400).json({
                err: "codigo de verificacion incorrecto"
            });
        }
        else {
            const usuario = yield usuario_1.default.findByIdAndUpdate(id, { estado: true }, { new: true });
            return res.json({
                msg: 'cuenta activada',
                usuario
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al intentar activar la cuenta de usuario hable con el administrador"
        });
    }
});
exports.patchVerifyNewUser = patchVerifyNewUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const user = yield usuario_1.default.findByIdAndUpdate(id, data);
        return res.json({
            msg: "Usuario actualizado",
            usuario: user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al intentar actualizar la informacion del usuario hable con el administrador"
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield usuario_1.default.findByIdAndUpdate(id, { estado: false });
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
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al intentar eliminar al usuario hable con el administrador"
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map