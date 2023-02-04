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
const admin = __importStar(require("firebase-admin"));
const usuario_1 = __importDefault(require("../models/usuario"));
const reserva_1 = __importDefault(require("../models/reserva"));
const petHouse_1 = __importDefault(require("../models/petHouse"));
const findOrCreateChat_1 = require("../helpers/findOrCreateChat");
//@ts-ignore
const socketsController = (socket) => {
    console.log(`Nueva conexion de: ${socket.id}`);
    const uid = socket.handshake.headers['usuario-uid'];
    socket.join(uid);
    socket.on("enviar-mensaje", (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { owner, recipient } = payload;
        try {
            const { savedMensaje, chats, chatsRecipient } = yield (0, findOrCreateChat_1.findOrCreateChat)(Object.assign({}, payload));
            const user = yield usuario_1.default.findById(recipient);
            const emisor = yield usuario_1.default.findById(owner).populate('pethouse', { nombre: 1 });
            //if (chats) {
            socket.emit("obtener-chats", chats);
            socket.to(`${recipient}`).emit("obtener-chats", chatsRecipient);
            //}//Renovar evento: actualizar chats
            socket.emit("chat-privado", { mensaje: savedMensaje });
            socket.to(`${recipient}`).emit("chat-privado", { mensaje: savedMensaje });
            if (user && emisor) {
                //@ts-ignore
                const nombre = (emisor === null || emisor === void 0 ? void 0 : emisor.pethouse) ? emisor === null || emisor === void 0 ? void 0 : emisor.pethouse.nombre : emisor.nombre;
                const message = {
                    notification: {
                        body: savedMensaje.mensaje,
                        title: nombre,
                    },
                    data: { type: "chat" },
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
                    // console.log("Notificacion enviada");
                })
                    .catch(console.log);
            }
        }
        catch (error) {
            console.log(error);
        }
    }));
    // socket.on('enviar-mensaje-global', async (payload: IPayloadSendMessage) => {
    //     const { emisor, destinatario, mensaje } = payload
    //     try {
    //         const newMensaje = new Mensaje({
    //             fecha: new Date(),
    //             emisor,
    //             destinatario,
    //             mensaje
    //         })
    //         const user = await Usuario.findById(destinatario)
    //         const savedMensaje = await newMensaje.save();
    //         const chatEmisor = await Chat.findById(emisor);
    //         const chatDestinatario = await Chat.findById(destinatario);
    //         if (chatEmisor)
    //             chatEmisor.mensajes = chatEmisor.mensajes.concat(savedMensaje.id)
    //         if (chatDestinatario)
    //             chatDestinatario.mensajes = chatDestinatario.mensajes.concat(savedMensaje.id)
    //         if (user) {
    //             const message = {
    //                 //tokens: [''],
    //                 notification: {
    //                     body: user.nombre + ' : ' + savedMensaje.mensaje,
    //                     title: 'Repets App',
    //                 },
    //                 data: {
    //                     nombre: "Arnold Olanda",
    //                     proyecto: "Repets App"
    //                 },
    //                 apns: {
    //                     payload: {
    //                         aps: { 'mutable-content': 1 },
    //                     },
    //                     fcm_options: { image: 'image-url' },
    //                 },
    //                 android: {
    //                     notification: { image: 'image-url' },
    //                 },
    //                 token: user.notification_token
    //             };
    //             await admin.messaging()
    //                 //@ts-ignore
    //                 .send(message)
    //                 .then(response => {
    //                     console.log(response);
    //                     console.log("Notificacion enviada");
    //                 })
    //                 .catch(console.log)
    //         }
    //         const mensajes = await Mensaje.find()
    //             .populate('emisor', { nombre: 1, apellido: 1 })
    //             .populate('destinatario', { nombre: 1, apellido: 1 })
    //         socket.broadcast.emit('actualizar-mensajes', mensajes)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
    // socket.on('solicitar-chats', async (payload: IPayloadGetChats) => {
    //     const { uid } = payload;
    //     const chats = await Chat.find({ miembros: { $in: [uid] } })
    //     socket.emit("obtener-chats", chats)
    // })
    // socket.on("solicitar-mensajes", async (payload: any) => {
    //     const { owner, recipient } = payload
    //     const chat = await Chat.findOne({ miembros: { $and: [{ $in: owner }, { $in: recipient }] } });
    //     socket.emit('obtener-mensajes', chat || []);
    // })
    socket.on("save-new-reservation", (payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { usuario, pethouse } = payload;
        try {
            const usuarioPethouse = yield petHouse_1.default.findById(pethouse);
            const propietario = yield usuario_1.default.findById(usuarioPethouse === null || usuarioPethouse === void 0 ? void 0 : usuarioPethouse.propietario);
            const newReserva = new reserva_1.default(payload);
            const savedReserva = yield newReserva.save();
            const reservaData = {
                fecha_reserva: savedReserva.fecha_reserva.toLocaleDateString(),
                fecha_solicitud: savedReserva.fecha_solicitud.toLocaleDateString(),
                duracion_dias: String(savedReserva.duracion_dias),
                duracion_horas: String(savedReserva.duracion_horas),
                usuario: String(savedReserva.usuario),
                pethouse: String(savedReserva.pethouse),
                mascotas: String(savedReserva.mascotas),
                costo_total: String(savedReserva.costo_total),
                metodo_pago: String(savedReserva.metodo_pago),
                estado: String(savedReserva.estado),
                tipo: 'notificacion_reserva',
                tipo_reserva: savedReserva.tipo_reserva
            };
            const { savedMensaje, chats } = yield (0, findOrCreateChat_1.findOrCreateChat)({
                owner: usuario,
                recipient: propietario.id,
                mensaje: "Tienes una nueva reserva! :)",
                tipo: "notificacion",
            });
            //Envio de la notificacion
            if (propietario) {
                const message = {
                    notification: {
                        body: "Tienes una nueva solicitud de reserva, revisa los mensajes",
                        title: "Nueva solicitud de reserva",
                    },
                    data: reservaData,
                    apns: {
                        payload: { aps: { 'mutable-content': 1 } },
                        fcm_options: { image: 'image-url' },
                    },
                    android: { notification: { image: 'image-url' } },
                    token: propietario.notification_token
                };
                yield admin.messaging()
                    //@ts-ignore
                    .send(message)
                    .then(_response => {
                    console.log("Notificacion enviada");
                })
                    .catch(console.log);
            }
            if (chats) {
                socket.emit("obtener-chats", chats);
                socket.to(`${propietario.id}`).emit("obtener-chats", chats);
            }
            socket.emit("chat-privado", { mensaje: savedMensaje });
            socket.to(`${propietario.id}`).emit("new-reservation", Object.assign(Object.assign({}, savedMensaje.toJSON()), { reserva: savedReserva.id }));
        }
        catch (error) {
            console.log(error);
        }
    }));
    socket.on("disconnect", () => {
        console.log("Conexion cerrada: ", socket.id);
    });
};
exports.socketsController = socketsController;
//# sourceMappingURL=socketsController.js.map