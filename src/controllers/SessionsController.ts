import { Request, Response } from 'express';
import { CreateSessionService } from '../services/CreateSessionService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createSessionService = new CreateSessionService();

    const { token, user } = await createSessionService.execute({
      username,
      password,
    });

    // @ts-expect-error The operand of delete must be optional.
    delete user.password;

    return res.json({ user, token });
  }
}

export { SessionsController };
