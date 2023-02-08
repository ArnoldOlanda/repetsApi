import { Schema, model } from "mongoose";

export interface IMensaje {
  fecha: Date;
  emisor: Schema.Types.ObjectId;
  chat_id: Schema.Types.ObjectId;
  tipo: string;
  mensaje: string;
  reserva_id?: Schema.Types.ObjectId;
}

const MensajeSchema = new Schema<IMensaje>({
  fecha: {
    type: Date,
    required: true,
  },
  emisor: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  chat_id: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  tipo: {
    type: String,
  },
  mensaje: String,
  reserva_id: {
    type: Schema.Types.ObjectId,
  },
});

MensajeSchema.methods.toJSON = function () {
  const { __v, password, _id, ...mensaje } = this.toObject();
  mensaje.uid = _id;
  return mensaje;
};

export default model("Mensaje", MensajeSchema);
