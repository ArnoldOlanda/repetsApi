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
exports.googleSignIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = require("../helpers/generarJWT");
const usuario_1 = __importDefault(require("../models/usuario"));
const googleVerify_1 = require("../helpers/googleVerify");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, password } = req.body;
    try {
        //Verificar si el email existe
        const usuarioDb = yield usuario_1.default.findOne({ correo: usuario });
        if (!usuarioDb)
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        //Si el usuario esta activo
        if (usuarioDb.estado === false)
            return res.status(400).json({
                msg: 'Este usuario no esta registrado '
            });
        //Verificar el password
        const validaPassword = bcryptjs_1.default.compareSync(password, usuarioDb.password);
        if (!validaPassword)
            return res.status(400).json({
                msg: 'El password es incorrecto'
            });
        // Generar el jwt
        const token = yield (0, generarJWT_1.generarJWT)(usuarioDb.id);
        return res.json({
            usuario: usuarioDb,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al loguear, hable con el administrador'
        });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { name, email, picture } = yield (0, googleVerify_1.googleVerify)(id_token);
        let usuario = yield usuario_1.default.findOne({ correo: email });
        if (!usuario) {
            const data = {
                nombre: name,
                correo: email,
                password: ':v',
                img: picture,
                google: true,
                estado: true,
                rol: 'USER_ROLE'
            };
            usuario = new usuario_1.default(data);
            console.log(usuario);
            yield usuario.save();
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            });
        }
        // Generar el jwt
        const token = yield (0, generarJWT_1.generarJWT)(usuario.id);
        return res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: 'false',
            err: 'No se pudo verificar el token'
        });
    }
});
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=auth.js.map