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
exports.findOrCreateChat = void 0;
const chat_1 = __importDefault(require("../models/chat"));
const mensaje_1 = __importDefault(require("../models/mensaje"));
const findOrCreateChat = ({ owner, recipient, mensaje, tipo }) => __awaiter(void 0, void 0, void 0, function* () {
    //Busqueda de existencia de chats
    const chat = yield chat_1.default.findOne({
        $and: [
            { miembros: { $in: [owner] } },
            { miembros: { $in: [recipient] } }
        ]
    });
    const data = {
        savedMensaje: undefined,
        chats: [],
        chatsRecipient: []
    };
    if (!chat) { //Creacion del chat
        const newChat = new chat_1.default({ miembros: [owner, recipient] });
        //Guardado del mensaje
        const newMensaje = new mensaje_1.default({
            fecha: new Date(),
            emisor: owner,
            chat_id: newChat.id,
            tipo,
            mensaje
        });
        const savedMensaje = yield newMensaje.save();
        data.savedMensaje = savedMensaje;
        newChat.ultimo_mensaje = savedMensaje.id;
        yield newChat.save();
    }
    else {
        console.log(typeof owner, typeof recipient);
        const newMensaje = new mensaje_1.default({
            fecha: new Date(),
            emisor: owner,
            chat_id: chat.id,
            tipo,
            mensaje
        });
        const savedMensaje = yield newMensaje.save();
        data.savedMensaje = savedMensaje;
        chat.ultimo_mensaje = savedMensaje.id;
        yield chat.save();
    }
    data.chats = yield chat_1.default.find({ miembros: { $in: { owner } } });
    data.chatsRecipient = yield chat_1.default.find({ miembros: { $in: { recipient } } });
    return data;
});
exports.findOrCreateChat = findOrCreateChat;
//# sourceMappingURL=findOrCreateChat.js.map