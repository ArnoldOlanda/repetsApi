import { Schema, model } from 'mongoose';

interface IMensaje {
    fecha: Date;
    emisor: Schema.Types.ObjectId;
    destinatario: Schema.Types.ObjectId;
    mensaje: string;
}


const MensajeSchema = new Schema<IMensaje>({
    fecha:{
        type: Date,
        required: true
    },
    emisor:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    destinatario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    mensaje: String
});

MensajeSchema.methods.toJSON = function () {
    const { __v, password, _id, ...mensaje } = this.toObject();
    mensaje.uid = _id;
    return mensaje;
}

export default model( 'Mensaje', MensajeSchema );