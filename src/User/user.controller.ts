import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

export class UserController {
  constructor(private readonly userService: UserService) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const userDto = req.body as CreateUserDto;
      const data = await this.userService.createUser(userDto);
      const { user, verifyCode } = data;
      return res.json({ user, verifyCode });
    } catch (error) {
      return res.status(500).json({
        msg: 'Internal server error',
      });
    }
  };

  public activateAccountUser = async (activateUserDto: any) => {
    try {
      const user = await this.userService.activateAccountUser(activateUserDto);
      return user;
    } catch (error) {
      throw error;
    }
  };
}
