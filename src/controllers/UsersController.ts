import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import { User } from '../models/User';
import { GetUserById } from '../services/GetUserBydIdService';
import { CreateUserService } from '../services/CreateUserService';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    const parsedUsers = users.map(user => {
      return {
        ...user,
        password: undefined,
      };
    });

    return res.json(parsedUsers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getUserById = new GetUserById();

    const user = await getUserById.execute(id);

    // @ts-expect-error The operand of delete must be optional.
    delete user.password;

    return res.json(user);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password, email } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      username,
      password,
      email,
    });

    // @ts-expect-error The operand of delete must be optional.
    delete user.password;

    return res.json(user);
  }
}

export { UsersController };
