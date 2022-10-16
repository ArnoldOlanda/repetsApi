
import { Schema } from 'mongoose';
import { Socket } from 'socket.io';
import Chat from '../models/chat';
import Mensaje from '../models/mensaje'
interface IPayloadGetChats{
    uid: string;
}

interface IPayloadSendMessage{
    fecha: Date;
    emisor: Schema.Types.ObjectId;
    destinatario: Schema.Types.ObjectId;
    mensaje: string; 
}

//@ts-ignore
export const socketsController = (socket = new Socket() ) => {

    console.log(`Nueva conexion de: ${ socket.id }`);
    
    socket.on('get-chats', async (payload: IPayloadGetChats) => {
        const { uid } = payload;

        console.log({usuario: uid});

        const chats = await Chat.findById( uid )

        socket.emit("send-chats", chats )
        
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
            const savedMensaje = await newMensaje.save();
            const chatEmisor = await Chat.findById( emisor );
            const chatDestinatario = await Chat.findById( destinatario );

            if( chatEmisor ) 
                chatEmisor.mensajes = chatEmisor.mensajes.concat(savedMensaje.id)

            if( chatDestinatario ) 
                chatDestinatario.mensajes = chatDestinatario.mensajes.concat(savedMensaje.id)

    
            const mensajes = await Mensaje.find()
                .populate('emisor',{ nombre: 1, apellido: 1 })
                .populate('destinatario',{ nombre: 1, apellido: 1 })
            
            socket.broadcast.emit( 'actualizar-mensajes', mensajes )
            
        } catch (error) {
            console.log(error);
        }


    })


    socket.on('get-mensajes-global', async () => {

        // const mensajes = await Mensaje.find()
        const mensajes = await Mensaje.find()
            .populate('emisor',{ nombre: 1, apellido: 1 })
            .populate('destinatario',{ nombre: 1, apellido: 1 });
        
        socket.emit('recibir-mensajes', mensajes )

    })

    socket.on("disconnect",() => {
        console.log("Conexion cerrada: ", socket.id);
    })
}