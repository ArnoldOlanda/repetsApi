import { Schema, model } from 'mongoose';

interface IUser {
    nombre: string;
    apellido: string;
    celular: string;
    correo: string;
    password: string;
    img: string;
    rol: string;
    estado: boolean;
    google: boolean;
}


const UsuarioSchema = new Schema<IUser>({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
    },
    celular:{
        type: String,
        required: [true, "El numero de celular es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enum: ['USER_ROLE','ADMIN_ROLE'],
    },
    estado:{
        type: Boolean,
        default: false,
    },
    google:{
        type: Boolean,
        default: false
    } 
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model( 'Usuario', UsuarioSchema );