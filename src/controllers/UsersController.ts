import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { GetUserById } from '../services/GetUserBydId';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getUserById = new GetUserById();

    const user = await getUserById.execute(id);

    return res.json(user);
  }
}

export { UsersController };
