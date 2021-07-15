import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { AppError } from '../errors/AppError';
import { User } from '../models/User';
import { CreateTokenProvider } from '../providers/CreateTokenProvider';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ username, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new AppError('Incorrect username/password combination!', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination!', 401);
    }

    const createTokenProvider = new CreateTokenProvider();

    const token = createTokenProvider.execute(user.id);

    return {
      user,
      token,
    };
  }
}

export { CreateSessionService };
