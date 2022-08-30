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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('access-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Se necesita enviar el token de auntenticacion'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = yield usuario_1.default.buscar(Number(uid));
        //Validar que el usuario exista en la base de datos
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario eliminado de la BD'
            });
        }
        //Validar que el estado del usuario sea TRUE
        //@ts-ignore
        if (usuario.estado == 0) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no activo'
            });
        }
        //@ts-ignore
        req.autenthicatedUser = usuario,
            next();
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token invalido'
        });
    }
});
exports.validarJWT = validarJWT;
