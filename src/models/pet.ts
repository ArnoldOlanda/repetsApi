import { Schema, model } from 'mongoose';

interface IPet {
    nombre: string;
    tipo: string;
    raza: string;
    edad: number;
    descripcion: string;
    caracteristicas: string[]; 
    img: string;
}


const PetSchema = new Schema<IPet>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    tipo: {
        type: String,
        required: [true, "El tipo de mascota es obligatoria"],
    },
    raza:{
        type: String,
        required: [true, "La raza es obligatoria"]
    },
    caracteristicas: [{ type: String, }],
    img:{ type: String, },

});

PetSchema.methods.toJSON = function () {
    const { __v, _id, ...pet } = this.toObject();
    pet.uid = _id;
    return pet;
}

export default model( 'Pet', PetSchema );