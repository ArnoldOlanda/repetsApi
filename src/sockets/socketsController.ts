import { Schema } from "mongoose";
import { Socket } from "socket.io";
import * as admin from "firebase-admin";

import Chat from "../models/chat";
import Mensaje from "../models/mensaje";
import Usuario from "../models/usuario";
import Reserva from "../models/reserva";
import Pethouse from "../models/petHouse";
import { findOrCreateChat } from "../helpers/findOrCreateChat";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
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
export const socketsController = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  console.log(`Nueva conexion de: ${socket.id}`);

  const uid = socket.handshake.headers["usuario-uid"] as string;

  socket.join(uid);

  socket.on("enviar-mensaje", async (payload: any) => {
    const { owner, recipient } = payload;
    try {
      const { savedMensaje, chats, chatsRecipient } = await findOrCreateChat({
        ...payload,
      });

      const user = await Usuario.findById(recipient);
      const emisor = await Usuario.findById(owner).populate("pethouse", {
        nombre: 1,
      });

      socket.emit("obtener-chats", chats);
      socket.to(`${recipient}`).emit("obtener-chats", chatsRecipient);

      socket.emit("chat-privado", { mensaje: savedMensaje });
      socket.to(`${recipient}`).emit("chat-privado", { mensaje: savedMensaje });

      if (user && emisor) {
        const nombre = emisor?.pethouse
          ? //@ts-ignore
            emisor?.pethouse.nombre
          : emisor.nombre;

        const message = {
          notification: {
            body: savedMensaje!.mensaje,
            title: nombre,
          },
          data: { type: "chat" },
          apns: {
            payload: { aps: { "mutable-content": 1 } },
            fcm_options: { image: "image-url" },
          },
          android: { notification: { image: "image-url" } },
          token: user.notification_token,
        };

        await admin
          .messaging()
          //@ts-ignore
          .send(message)
          .then((_response) => {
            // console.log("Notificacion enviada");
          })
          .catch(console.log);
      }
    } catch (error) {
      console.log(error);
    }
  });

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

  socket.on("save-new-reservation", async (payload: any) => {
    const { usuario, pethouse } = payload;

    try {
      const usuarioPethouse = await Pethouse.findById(pethouse);
      const propietario = await Usuario.findById(usuarioPethouse?.propietario);

      const newReserva = new Reserva(payload);
      const savedReserva = await newReserva.save();

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
        tipo: "notificacion_reserva",
        tipo_reserva: savedReserva.tipo_reserva,
      };

      const { savedMensaje, chats, chatsRecipient } = await findOrCreateChat({
        owner: usuario,
        recipient: propietario!.id,
        mensaje: "Tienes una nueva reserva! :)",
        tipo: "notificacion",
        reserva_id: savedReserva.id,
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
            payload: { aps: { "mutable-content": 1 } },
            fcm_options: { image: "image-url" },
          },
          android: { notification: { image: "image-url" } },
          token: propietario.notification_token,
        };

        await admin
          .messaging()
          //@ts-ignore
          .send(message)
          .then((_response) => {
            console.log("Notificacion enviada");
          })
          .catch(console.log);
      }

      if (chats) {
        socket.emit("obtener-chats", chats);
        socket.to(`${propietario!.id}`).emit("obtener-chats", chatsRecipient);
      }

      socket.emit("chat-privado", { mensaje: savedMensaje });
      socket.to(`${propietario!.id}`).emit("new-reservation", savedMensaje);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Conexion cerrada: ", socket.id);
  });
};
