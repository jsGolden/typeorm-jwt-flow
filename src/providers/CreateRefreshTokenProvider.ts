import { getRepository } from 'typeorm';

import { AppError } from '../errors/AppError';
import authConfig from '../config/auth';

import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';

class CreateRefreshTokenProvider {
  public async execute(userId: string): Promise<string> {
    const usersRepository = getRepository(User);
    const refreshTokensRepository = getRepository(RefreshToken);

    const user = await usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    await refreshTokensRepository.delete({
      user_id: userId,
    });

    const { refreshTokenExpiresIn } = authConfig.jwt;

    const refresh_token = refreshTokensRepository.create({
      user_id: userId,
      expires_in: refreshTokenExpiresIn,
    });
    await refreshTokensRepository.save(refresh_token);

    user.refresh_token = refresh_token.id;

    await usersRepository.save(user);

    return refresh_token.id;
  }
}

export { CreateRefreshTokenProvider };
