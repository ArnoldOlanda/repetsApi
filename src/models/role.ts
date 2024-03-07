import { model, Schema } from 'mongoose';

interface IRol {
  rol: string;
}

const RoleSchema = new Schema<IRol>({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio'],
  },
});

export default model('Role', RoleSchema);
