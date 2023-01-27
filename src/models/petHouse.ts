import { Schema, model } from 'mongoose';
import Categoria from '../models/categoria'

interface Coordendas{
    latitud: String;
    longitud: String;
}

interface IPetHouse {
    nombre: string;
    descripcion:string;
    distrito: string;
    provincia: string;
    direccion: string;
    coordenadas: Coordendas;
    celular: string;
    propietario: Schema.Types.ObjectId;
    galeria: string[];
    tarifa_dia: number;
    tarifa_hora: number;
    calificacion: number; // 1 al 5
    tipo_mascotas: string;
    tamanio_mascotas: string[];
    tipo_alojamiento: string[];
    estado: boolean;
}


const PetHouseSchema = new Schema<IPetHouse>({
    nombre: { type: String, },
    descripcion:{ type: String },
    distrito: {
        type: String,
        required: [true, "El distrito es obligatorio"],
    },
    provincia:{
        type: String,
        default: 'Arequipa',
        required: true
    },
    direccion:{
        type: String,
        //required: [true, "La direccion es obligatoria"]
    },
    coordenadas:{
        type: Object,
    },
    celular: {
        type: String,
        //required: [true, "El celular es obligatorio"],
    },
    propietario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: [true, 'El uid del propietario es obligatorio']
    },
    galeria:[{ type: String }],
    tarifa_dia:{ type: Number, },
    tarifa_hora:{ 
        type: Number, 
        // required:true 
    },
    calificacion:{ type: Number },
    tipo_mascotas:{
        type: String,
        required: true
    },
    tamanio_mascotas:[{
        type: String,
        required: true
    }],
    tipo_alojamiento: [{ 
        type: String, 
        required: true 
    }],
    estado:{
        type: Boolean,
        default: true,
        required: true
    },

});

PetHouseSchema.methods.toJSON = function () {
    const { __v, _id, ...petHouse } = this.toObject();
    petHouse.uid = _id;
    return petHouse;
}

const PetHouse = model( 'PetHouse', PetHouseSchema );
export default PetHouse;