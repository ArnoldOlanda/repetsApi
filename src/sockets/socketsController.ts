
import { Schema } from 'mongoose';
import { Socket } from 'socket.io';
import * as admin from 'firebase-admin';

import Chat from '../models/chat';
import Mensaje from '../models/mensaje'
import Usuario from '../models/usuario';
interface IPayloadGetChats {
    uid: string;
}

interface IPayloadSendMessage {
    fecha: Date;
    emisor: Schema.Types.ObjectId;
    destinatario: Schema.Types.ObjectId;
    mensaje: string;
}

//@ts-ignore
export const socketsController = (socket = new Socket()) => {

    console.log(`Nueva conexion de: ${socket.id}`);

    const uid = socket.handshake.headers['usuario-uid'] as string

    socket.join(uid)

    socket.on("enviar-mensaje", async (payload: any) => {

        const { owner, recipient, mensaje } = payload
        try {
            //Busqueda de existencia de chats
            const chatOwner = await Chat.findOne({ usuario_owner: owner, usuario_recipient: recipient }).exec();
            const chatRecipient = await Chat.findOne({ usuario_owner: recipient, usuario_recipient: owner }).exec();

            //Guardado del mensaje
            const newMensaje = new Mensaje({
                fecha: new Date(),
                emisor: owner,
                destinatario: recipient,
                mensaje
            })

            const savedMensaje = await newMensaje.save();


            if (!chatOwner) { //Creacion del chat

                const newChatOwner = new Chat({ usuario_owner: owner, usuario_recipient: recipient });
                newChatOwner.mensajes = newChatOwner.mensajes.concat(savedMensaje.id)
                newChatOwner.ultimo_mensaje = savedMensaje.id

                await newChatOwner.save();

                const chats = await Chat.find({ usuario_owner: uid })
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
                    .populate('mensajes')

                socket.emit("chat-privado", { mensaje: savedMensaje });
                socket.emit("obtener-chats", chats);

            } else {

                chatOwner.mensajes = chatOwner.mensajes.concat(savedMensaje.id)
                chatOwner.ultimo_mensaje = savedMensaje.id

                await chatOwner.save();

                const chats = await Chat.find({ usuario_owner: uid })
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
                    .populate('mensajes')

                socket.emit("chat-privado", { mensaje: savedMensaje });
                socket.emit("obtener-chats", chats);
            }

            if (!chatRecipient) { //Creacion del chat

                const newChatRecipient = new Chat({ usuario_owner: recipient, usuario_recipient: owner });
                newChatRecipient.mensajes = newChatRecipient.mensajes.concat(savedMensaje.id);
                newChatRecipient.ultimo_mensaje = savedMensaje.id;

                await newChatRecipient.save();

                const chats = await Chat.find({ usuario_owner: recipient })
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
                    .populate('mensajes')

                socket.to(recipient).emit("chat-privado", { mensaje: savedMensaje })
                socket.to(recipient).emit("obtener-chats", chats)
            } else {

                chatRecipient.mensajes = chatRecipient.mensajes.concat(savedMensaje.id)
                chatRecipient.ultimo_mensaje = savedMensaje.id

                await chatRecipient.save();

                const chats = await Chat.find({ usuario_owner: recipient })
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
                    .populate('mensajes')

                socket.to(recipient).emit("chat-privado", { mensaje: savedMensaje })
                socket.to(recipient).emit("obtener-chats", chats)

                //TODO: ver porque no se actualizan los chats del usuario al recibir nuevo mensaje
            }

            const user = await Usuario.findById(recipient);
            const emisor = await Usuario.findById(owner).populate('pethouse',{ nombre: 1 });

            if (user && emisor) {
                //@ts-ignore
                const nombre = emisor?.pethouse ? emisor?.pethouse.nombre : emisor.nombre

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

                await admin.messaging()
                    //@ts-ignore
                    .send(message)
                    .then(_response => {
                        console.log("Notificacion enviada");
                    })
                    .catch(console.log)
            }


        } catch (error) {
            console.log(error)
        }
    })

    socket.on('enviar-mensaje-global', async (payload: IPayloadSendMessage) => {

        const { emisor, destinatario, mensaje } = payload

        try {
            const newMensaje = new Mensaje({
                fecha: new Date(),
                emisor,
                destinatario,
                mensaje
            })
            const user = await Usuario.findById(destinatario)

            const savedMensaje = await newMensaje.save();
            const chatEmisor = await Chat.findById(emisor);
            const chatDestinatario = await Chat.findById(destinatario);

            if (chatEmisor)
                chatEmisor.mensajes = chatEmisor.mensajes.concat(savedMensaje.id)

            if (chatDestinatario)
                chatDestinatario.mensajes = chatDestinatario.mensajes.concat(savedMensaje.id)

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

                await admin.messaging()
                    //@ts-ignore
                    .send(message)
                    .then(response => {
                        console.log(response);

                        console.log("Notificacion enviada");
                    })
                    .catch(console.log)
            }

            const mensajes = await Mensaje.find()
                .populate('emisor', { nombre: 1, apellido: 1 })
                .populate('destinatario', { nombre: 1, apellido: 1 })

            socket.broadcast.emit('actualizar-mensajes', mensajes)

        } catch (error) {
            console.log(error);
        }


    })

    socket.on('solicitar-chats', async (payload: IPayloadGetChats) => {
        const { uid } = payload;


        const chats = await Chat.find({ usuario_owner: uid })
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
            .populate('mensajes')

        socket.emit("obtener-chats", chats)

    })

    socket.on("solicitar-mensajes", async (payload: any) => {


        const { owner, recipient } = payload
        
        const chat = await Chat.findOne({ usuario_owner: owner, usuario_recipient: recipient })
            .populate('usuario_owner', { nombre: 1, apellido: 1 })
            .populate({
                path: 'usuario_recipient',
                select: { nombre: 1, apellido: 1, img: 1 },
                populate: {
                    path: 'pethouse',
                    select: { nombre: 1, galeria: 1 }
                }
            })
            .populate('mensajes');

        socket.emit('obtener-mensajes', chat || []);
    })


    socket.on("disconnect", () => {
        console.log("Conexion cerrada: ", socket.id);
    })
}