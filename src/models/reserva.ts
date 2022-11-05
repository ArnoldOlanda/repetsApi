import { Schema, model } from 'mongoose';

interface IReserva {
    fecha_solicitud: Date,
    fecha_reserva: Date,
    duracion_dias: number,
    duracion_horas: number,
    usuario: Schema.Types.ObjectId,
    pethouse: Schema.Types.ObjectId,
    cantidad_mascotas: number,
    costo_total: number,
    estado: string
}


const ReservaSchema = new Schema<IReserva>({
    fecha_solicitud:{
        type: Date,
        required:true
    },
    fecha_reserva:{
        type:Date,
        required:true
    },
    duracion_dias:Number,
    duracion_horas:Number,
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
    pethouse:{
        type:Schema.Types.ObjectId,
        ref:'PetHouse'
    },
    cantidad_mascotas:{
        type:Number,
        required:true
    },
    costo_total:{
        type:Number,
        required:true
    },
    estado:{
        type:String,
        required:true,
        default:'espera'
    }
});

ReservaSchema.methods.toJSON = function () {
    const { __v, _id, ...reserva } = this.toObject();
    reserva.uid = _id;
    return reserva;
}

export default model( 'Reserva', ReservaSchema );