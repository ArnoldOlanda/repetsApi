import { Schema, model } from 'mongoose';

interface IReserva {
    fecha_solicitud: Date,
    fecha_reserva: Date,
    duracion_dias: number,
    duracion_horas: number,
    usuario: Schema.Types.ObjectId,
    pethouse: Schema.Types.ObjectId,
    mascotas: Schema.Types.ObjectId[],
    costo_total: number,
    metodo_pago:string,
    tipo_reserva:string,
    payment_intent_token:string,
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
    mascotas:[{
        type:Schema.Types.ObjectId,
        ref:'Pet'
    }],
    costo_total:{
        type:Number,
        required:true
    },
    metodo_pago:{
        type: String,
    },
    tipo_reserva:{
        type: String
    },
    payment_intent_token:{
        type: String,
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