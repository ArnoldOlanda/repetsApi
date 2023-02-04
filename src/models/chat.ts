import { Schema, model } from 'mongoose';

export interface IChat {
    miembros: Schema.Types.ObjectId[];
    new_messages: boolean;
    ultimo_mensaje: Schema.Types.ObjectId;
}


const ChatSchema = new Schema<IChat>({
    miembros:[{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }],
    new_messages:{
        type:Boolean,
        default:true
    },
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