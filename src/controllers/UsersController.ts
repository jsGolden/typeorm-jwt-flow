import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { GetUserById } from '../services/GetUserBydId';

class UsersController {
  public static async index(req: Request, res: Response): Promise<Response> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();
    return res.json(users);
  }

  public static async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const user = await GetUserById.execute(id);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}

export { UsersController };
