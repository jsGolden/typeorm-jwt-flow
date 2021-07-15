import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

class CreateTokenProvider {
  public execute(userId: string): string {
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userId,
      expiresIn,
    });

    return token;
  }
}

export { CreateTokenProvider };
