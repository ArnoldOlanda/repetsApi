import { Schema, model } from 'mongoose';

interface IMensaje {
    fecha: Date;
    mensaje: string;
}


const MensajeSchema = new Schema<IMensaje>({
    fecha:{
        type: Date,
        required: true
    },
    mensaje: String
});

MensajeSchema.methods.toJSON = function () {
    const { __v, password, _id, ...mensaje } = this.toObject();
    mensaje.uid = _id;
    return mensaje;
}

export default model( 'Mensaje', MensajeSchema );