import { Schema, model } from 'mongoose';
import Categoria from '../models/categoria'

interface Coordendas{
    latitud: String;
    longitud: String;
}

interface IPetHouse {
    nombre: string;
    distrito: string;
    provincia: string;
    direccion: string;
    coordenadas: Coordendas;
    celular: string;
    propietario: string;
    galeria: string[];
    tarifa_dia: number;
    tarifa_hora: number;
    calificacion: number; // 1 al 5
    categorias: Schema.Types.ObjectId[];
    tipo_alojamiento: string;
    estado: boolean;
}


const PetHouseSchema = new Schema<IPetHouse>({
    nombre: { type: String, },
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
        latitud: {
            type: String,
            required: true
        },
        longitud: {
            type: String,
            required: true
        }
    },
    celular: {
        type: String,
        //required: [true, "El celular es obligatorio"],
    },
    propietario: {
        type: String,
        required: [true, 'El nombre del propietario es obligatorio']
    },
    galeria:[{ type: String }],
    tarifa_dia:{ type: Number, },
    tarifa_hora:{ 
        type: Number, 
        // required:true 
    },
    calificacion:{ type: Number },
    categorias:[{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    }],
    tipo_alojamiento: { type: String, required: true },
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