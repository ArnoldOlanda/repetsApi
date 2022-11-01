"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.socketsController = void 0;
const socket_io_1 = require("socket.io");
const admin = __importStar(require("firebase-admin"));
const chat_1 = __importDefault(require("../models/chat"));
const mensaje_1 = __importDefault(require("../models/mensaje"));
const usuario_1 = __importDefault(require("../models/usuario"));
//@ts-ignore
const socketsController = (socket = new socket_io_1.Socket()) => {
    console.log(`Nueva conexion de: ${socket.id}`);
    const uid = socket.handshake.headers['usuario-uid'];
    socket.join(uid);
    socket.on("enviar-mensaje", (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner, recipient, mensaje } = payload;
        try {
            //Busqueda de existencia de chats
            const chatOwner = yield chat_1.default.findOne({ usuario_owner: owner, usuario_recipient: recipient }).exec();
            const chatRecipient = yield chat_1.default.findOne({ usuario_owner: recipient, usuario_recipient: owner }).exec();
            //Guardado del mensaje
            const newMensaje = new mensaje_1.default({
                fecha: new Date(),
                emisor: owner,
                destinatario: recipient,
                mensaje
            });
            const savedMensaje = yield newMensaje.save();
            if (!chatOwner) { //Creacion del chat
                const newChatOwner = new chat_1.default({ usuario_owner: owner, usuario_recipient: recipient });
                newChatOwner.mensajes = newChatOwner.mensajes.concat(savedMensaje.id);
                newChatOwner.ultimo_mensaje = savedMensaje.id;
                yield newChatOwner.save();
                const chats = yield chat_1.default.find({ usuario_owner: uid })
                    .populate('usuario_owner', { nombre: 1, apellido: 1 })
                    .populate({
                    path: 'usuario_recipient',
                    select: { nombre: 1, apellido: 1, img: 1 },
                    populate: {
                        path: 'pethouse',
                        select: { nombre: 1, galeria: 1 }
                    }
                })
                    .populate('ultimo_mensaje')
                    .populate('mensajes');
                socket.emit("chat-privado", { mensaje: savedMensaje });
                socket.emit("obtener-chats", chats);
            }
            else {
                chatOwner.mensajes = chatOwner.mensajes.concat(savedMensaje.id);
                chatOwner.ultimo_mensaje = savedMensaje.id;
                yield chatOwner.save();
                const chats = yield chat_1.default.find({ usuario_owner: uid })
                    .populate('usuario_owner', { nombre: 1, apellido: 1 })
                    .populate({
                    path: 'usuario_recipient',
                    select: { nombre: 1, apellido: 1, img: 1 },
                    populate: {
                        path: 'pethouse',
                        select: { nombre: 1, galeria: 1 }
                    }
                })
                    .populate('ultimo_mensaje')
                    .populate('mensajes');
                socket.emit("chat-privado", { mensaje: savedMensaje });
                socket.emit("obtener-chats", chats);
            }
            if (!chatRecipient) { //Creacion del chat
                const newChatRecipient = new chat_1.default({ usuario_owner: recipient, usuario_recipient: owner });
                newChatRecipient.mensajes = newChatRecipient.mensajes.concat(savedMensaje.id);
                newChatRecipient.ultimo_mensaje = savedMensaje.id;
                yield newChatRecipient.save();
                const chats = yield chat_1.default.find({ usuario_owner: recipient })
                    .populate('usuario_owner', { nombre: 1, apellido: 1 })
                    .populate({
                    path: 'usuario_recipient',
                    select: { nombre: 1, apellido: 1, img: 1 },
                    populate: {
                        path: 'pethouse',
                        select: { nombre: 1, galeria: 1 }
                    }
                })
                    .populate('ultimo_mensaje')
                    .populate('mensajes');
                socket.to(recipient).emit("chat-privado", { mensaje: savedMensaje });
                socket.to(recipient).emit("obtener-chats", chats);
            }
            else {
                chatRecipient.mensajes = chatRecipient.mensajes.concat(savedMensaje.id);
                chatRecipient.ultimo_mensaje = savedMensaje.id;
                yield chatRecipient.save();
                const chats = yield chat_1.default.find({ usuario_owner: recipient })
                    .populate('usuario_owner', { nombre: 1, apellido: 1, img: 1 })
                    .populate({
                    path: 'usuario_recipient',
                    select: { nombre: 1, apellido: 1 },
                    populate: {
                        path: 'pethouse',
                        select: { nombre: 1, galeria: 1 }
                    }
                })
                    .populate('ultimo_mensaje')
                    .populate('mensajes');
                socket.to(recipient).emit("chat-privado", { mensaje: savedMensaje });
                socket.to(recipient).emit("obtener-chats", chats);
                //TODO: ver porque no se actualizan los chats del usuario al recibir nuevo mensaje
            }
            const user = yield usuario_1.default.findById(recipient);
            const emisor = yield usuario_1.default.findById(owner).populate('pethouse', { nombre: 1 });
            if (user && emisor) {
                //@ts-ignore
                const nombre = (emisor === null || emisor === void 0 ? void 0 : emisor.pethouse) ? emisor === null || emisor === void 0 ? void 0 : emisor.pethouse.nombre : emisor.nombre;
                const message = {
                    notification: {
                        body: savedMensaje.mensaje,
                        title: nombre,
                    },
                    data: { nombre: "Arnold Olanda", proyecto: "Repets App" },
                    apns: {
                        payload: { aps: { 'mutable-content': 1 } },
                        fcm_options: { image: 'image-url' },
                    },
                    android: { notification: { image: 'image-url' } },
                    token: user.notification_token
                };
                yield admin.messaging()
                    //@ts-ignore
                    .send(message)
                    .then(_response => {
                    console.log("Notificacion enviada");
                })
                    .catch(console.log);
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on('enviar-mensaje-global', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { emisor, destinatario, mensaje } = payload;
        try {
            const newMensaje = new mensaje_1.default({
                fecha: new Date(),
                emisor,
                destinatario,
                mensaje
            });
            const user = yield usuario_1.default.findById(destinatario);
            const savedMensaje = yield newMensaje.save();
            const chatEmisor = yield chat_1.default.findById(emisor);
            const chatDestinatario = yield chat_1.default.findById(destinatario);
            if (chatEmisor)
                chatEmisor.mensajes = chatEmisor.mensajes.concat(savedMensaje.id);
            if (chatDestinatario)
                chatDestinatario.mensajes = chatDestinatario.mensajes.concat(savedMensaje.id);
            if (user) {
                const message = {
                    //tokens: [''],
                    notification: {
                        body: user.nombre + ' : ' + savedMensaje.mensaje,
                        title: 'Repets App',
                    },
                    data: {
                        nombre: "Arnold Olanda",
                        proyecto: "Repets App"
                    },
                    apns: {
                        payload: {
                            aps: { 'mutable-content': 1 },
                        },
                        fcm_options: { image: 'image-url' },
                    },
                    android: {
                        notification: { image: 'image-url' },
                    },
                    token: user.notification_token
                };
                yield admin.messaging()
                    //@ts-ignore
                    .send(message)
                    .then(response => {
                    console.log(response);
                    console.log("Notificacion enviada");
                })
                    .catch(console.log);
            }
            const mensajes = yield mensaje_1.default.find()
                .populate('emisor', { nombre: 1, apellido: 1 })
                .populate('destinatario', { nombre: 1, apellido: 1 });
            socket.broadcast.emit('actualizar-mensajes', mensajes);
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on('solicitar-chats', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { uid } = payload;
        const chats = yield chat_1.default.find({ usuario_owner: uid })
            .populate('usuario_owner', { nombre: 1, apellido: 1 })
            .populate({
            path: 'usuario_recipient',
            select: { nombre: 1, apellido: 1, img: 1 },
            populate: {
                path: 'pethouse',
                select: { nombre: 1, galeria: 1 }
            }
        })
            .populate('ultimo_mensaje')
            .populate('mensajes');
        socket.emit("obtener-chats", chats);
    }));
    socket.on("solicitar-mensajes", (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { chat } = payload;
        const chat2 = yield chat_1.default.findById(chat).populate('mensajes');
        socket.emit('obtener-mensajes-chat', chat2 === null || chat2 === void 0 ? void 0 : chat2.mensajes);
    }));
    socket.on("disconnect", () => {
        console.log("Conexion cerrada: ", socket.id);
    });
};
exports.socketsController = socketsController;
//# sourceMappingURL=socketsController.js.map