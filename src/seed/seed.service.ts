import Usuario from '../models/usuario';
import Rol from '../models/role';
import Categoria from '../models/categoria';
import { ROLES } from '../enums/rol';
import { encryptPassword } from '../helpers/encryptPassword';

export class SeedService {
  public async seed() {
    try {
      await Usuario.deleteMany({});
      await Rol.deleteMany({});
      await Categoria.deleteMany({});

      const superAdmin = new Usuario({
        nombre: 'Super',
        apellido: 'Admin',
        correo: 'admin@gmail.com',
        password: await encryptPassword('password'),
        rol: 'SUPER_ADMIN_ROLE',
        estado: true,
      });
      await superAdmin.save();

      Rol.create([
        { rol: ROLES.ADMIN },
        { rol: ROLES.USER },
        { rol: ROLES.SUPER_ADMIN },
        { rol: ROLES.PETHOUSE },
      ]);

      Categoria.create([
        { categoria: 'Perros' },
        { categoria: 'Gatos' },
        { categoria: 'Conejos' },
        { categoria: 'Aves' },
      ]);

      return {
        message: 'Seed executed!!',
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
}
