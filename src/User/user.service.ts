import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcryptjs from 'bcryptjs';
import { CreateUserDto } from './dto/createUser.dto';
import { generarJWT, generateVerifyCode } from '../helpers';

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async findUserById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(
    userDto: CreateUserDto
  ): Promise<{ user: User; verifyCode: number }> {
    try {
      let { password, ...rest } = userDto;

      const salt = bcryptjs.genSaltSync();
      password = bcryptjs.hashSync(password, salt);

      const user = this.userRepository.create({ ...rest, password });
      await this.userRepository.save(user);

      const verifyCode = generateVerifyCode();

      //send mail
      //sendMail(correo, verifyCode)

      return { user, verifyCode };
    } catch (error) {
      throw error;
    }
  }

  //Activar cuenta de nuevo usuario
  async activateAccountUser(activateUserDto: any) {
    try {
      const { id, generateCode, givenCode } = activateUserDto;
      console.log(id);

      if (generateCode !== givenCode) {
        throw new Error('Codigo de verificacion incorrecto');
      } else {
        const usuario = await this.userRepository.findOneBy({ id });
        if (!usuario) {
          throw new Error('Usuario no encontrado');
        }
        usuario.state = true;

        await this.userRepository.save(usuario);
        const token = await generarJWT(id);

        return { usuario, token };
      }
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
