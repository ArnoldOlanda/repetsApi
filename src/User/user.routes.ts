import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { Repository } from 'typeorm';
import { validateFields } from '../middlewares/validateFields';
import { CreateUserDto } from './dto/createUser.dto';

export class UserRoutes {
  constructor(
    private readonly router: Router = Router(),
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(
      User
    ),
    private readonly userService: UserService = new UserService(userRepository),
    private readonly userController: UserController = new UserController(
      userService
    )
  ) {}

  get routes() {
    this.router.post(
      '/register',
      validateFields(CreateUserDto),
      this.userController.createUser
    );
    return this.router;
  }
}
