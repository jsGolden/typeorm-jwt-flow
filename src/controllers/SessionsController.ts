import { Request, Response } from 'express';
import { CheckUserRefreshTokenService } from '../services/CheckUserRefreshTokenService';
import { CreateSessionService } from '../services/CreateSessionService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createSessionService = new CreateSessionService();

    const { token, refresh_token, user } = await createSessionService.execute({
      username,
      password,
    });

    // @ts-expect-error The operand of delete must be optional.
    delete user.password;

    return res.json({ user, token, refresh_token });
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    const { refresh_token } = req.body;

    const checkUserRefreshTokenService = new CheckUserRefreshTokenService();

    const tokenResponse = await checkUserRefreshTokenService.execute(
      refresh_token,
    );

    return res.json(tokenResponse);
  }
}

export { SessionsController };
