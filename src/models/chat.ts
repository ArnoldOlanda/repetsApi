import { Schema, model } from 'mongoose';

interface IChat {
    usuario: Schema.Types.ObjectId;
    alojamiento: Schema.Types.ObjectId;
    mensajes: Schema.Types.ObjectId[];
    ultimo_mensaje: Schema.Types.ObjectId;
}


const ChatSchema = new Schema<IChat>({
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    alojamiento:{
        type: Schema.Types.ObjectId,
        ref:'PetHouse'
    },
    mensajes:[{
        type: Schema.Types.ObjectId,
        ref:'Mensaje'
    }],
    ultimo_mensaje:{
        type: Schema.Types.ObjectId,
        ref:'Mensaje'
    }
});

ChatSchema.methods.toJSON = function () {
    const { __v, password, _id, ...chat } = this.toObject();
    chat.uid = _id;
    return chat;
}

export default model( 'Chat', ChatSchema );