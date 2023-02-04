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
exports.getChats = exports.getMensajes = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const mensaje_1 = __importDefault(require("../models/mensaje"));
const getMensajes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emisor, receptor } = req.params; //Chat ID
    try {
        const chat = yield chat_1.default.findOne({
            $and: [
                { miembros: { $in: [emisor] } },
                { miembros: { $in: [receptor] } }
            ]
        });
        if (chat) {
            const mensajes = yield mensaje_1.default.find({ chat_id: chat.id });
            return res.json(mensajes);
        }
        return res.json([]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            err: "Ocurrio un error hable con el administrador"
        });
    }
});
exports.getMensajes = getMensajes;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const chats = yield chat_1.default.find({ miembros: { $in: id } })
            .populate({
            path: "miembros",
            select: "nombre apellido img",
            populate: {
                path: "pethouse",
                select: "nombre galeria"
            }
        })
            .populate("ultimo_mensaje", "fecha mensaje emisor");
        return res.json(chats);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            err: "Ocurrio un error hable con el administrador"
        });
    }
});
exports.getChats = getChats;
//# sourceMappingURL=mensajes.js.map