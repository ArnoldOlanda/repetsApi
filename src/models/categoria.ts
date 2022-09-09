import { model, Schema } from "mongoose";

interface ICategoria{
    categoria: string;
    estado: boolean;
}


const CategoriaSchema = new Schema<ICategoria>({
    categoria: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    }
})

CategoriaSchema.methods.toJSON = function () {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}


const Categoria = model('Categoria', CategoriaSchema);
export default Categoria;