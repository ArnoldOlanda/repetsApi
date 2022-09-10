import { Schema, model } from 'mongoose';

interface IPet {
    nombre: string;
    especie: string;
    raza: string;
    comportamiento: string[];
    tamaño: string; //grande,pequeño
    img: string;
}


const PetSchema = new Schema<IPet>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    especie: {
        type: String,
        required: [true, "La especie es obligatoria"],
    },
    raza:{
        type: String,
        required: [true, "La raza es obligatoria"]
    },
    comportamiento: [{ type: String, }],
    tamaño: { type: String, },
    img:{ type: String, },

});

PetSchema.methods.toJSON = function () {
    const { __v, _id, ...pet } = this.toObject();
    pet.uid = _id;
    return pet;
}

export default model( 'Pet', PetSchema );