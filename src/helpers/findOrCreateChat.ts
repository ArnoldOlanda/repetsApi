import { Document, Schema, Types } from 'mongoose';
import Chat, { IChat } from '../models/chat';
import Mensaje, { IMensaje } from '../models/mensaje'

interface Params {
    owner: Schema.Types.ObjectId;
    recipient: Schema.Types.ObjectId;
    mensaje: string;
    tipo: string;
}

interface Data {
    savedMensaje: Document<unknown, any, IMensaje> & IMensaje & { _id: Types.ObjectId; } | undefined;
    chats: (Document<unknown, any, IChat> & IChat & {_id: Types.ObjectId;})[] | [];
    chatsRecipient: (Document<unknown, any, IChat> & IChat & {_id: Types.ObjectId;})[] | [];
}

export const findOrCreateChat = async ({ owner, recipient, mensaje, tipo }: Params) => {
    //Busqueda de existencia de chats
    const chat = await Chat.findOne({
        $and: [
            { miembros: { $in: [owner] } },
            { miembros: { $in: [recipient] } }
        ]
    })
    
    
    const data: Data = {
        savedMensaje: undefined,
        chats: [],
        chatsRecipient: []
    }
    
    if (!chat) { //Creacion del chat
        
        const newChat = new Chat({ miembros: [owner, recipient] });
        
        //Guardado del mensaje
        const newMensaje = new Mensaje({
            fecha: new Date(),
            emisor: owner,
            chat_id: newChat.id,
            tipo,
            mensaje
        })
        const savedMensaje = await newMensaje.save();
        data.savedMensaje = savedMensaje;
        newChat.ultimo_mensaje = savedMensaje.id;    
        
        await newChat.save();
        
    } else {

        const newMensaje = new Mensaje({
            fecha: new Date(),
            emisor: owner,
            chat_id: chat.id,
            tipo,
            mensaje
        })

        const savedMensaje = await newMensaje.save();
        data.savedMensaje = savedMensaje;
        chat.ultimo_mensaje = savedMensaje.id; 

        await chat.save();


        
    }
    data.chats = await Chat.find({miembros:{$in:owner}})
        .populate({
            path:"miembros",
            select:"nombre apellido img",
            populate:{
                path:"pethouse",
                select:"nombre galeria"
            }
        })
        .populate("ultimo_mensaje", "fecha mensaje emisor");
        
    data.chatsRecipient = await Chat.find({miembros:{$in:recipient}})
        .populate({
            path:"miembros",
            select:"nombre apellido img",
            populate:{
                path:"pethouse",
                select:"nombre galeria"
            }
        })
        .populate("ultimo_mensaje", "fecha mensaje emisor");

    return data;
}