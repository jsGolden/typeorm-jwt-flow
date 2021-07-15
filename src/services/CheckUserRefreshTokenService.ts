import { getRepository } from 'typeorm';
import dayjs from 'dayjs';

import { AppError } from '../errors/AppError';
import { RefreshToken } from '../models/RefreshToken';
import { CreateTokenProvider } from '../providers/CreateTokenProvider';
import { CreateRefreshTokenProvider } from '../providers/CreateRefreshTokenProvider';

const uuidv4Regex = new RegExp(
  /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,
);

interface Response {
  token: string;
  refresh_token?: string;
}

class CheckUserRefreshTokenService {
  public async execute(refresh_token: string): Promise<Response> {
    const isValidUuid = uuidv4Regex.test(refresh_token);
    if (!isValidUuid) {
      throw new AppError('Refresh Token is in invalid format!');
    }

    const refreshTokensRepository = getRepository(RefreshToken);

    const refreshToken = await refreshTokensRepository.findOne({
      where: { id: refresh_token },
    });

    if (!refreshToken) {
      throw new AppError('Invalid refresh token!', 401);
    }

    const createTokenProvider = new CreateTokenProvider();
    const token = createTokenProvider.execute(refreshToken.user_id);

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expires_in),
    );

    if (refreshTokenExpired) {
      const createRefreshTokenProvider = new CreateRefreshTokenProvider();
      const newRefreshToken = await createRefreshTokenProvider.execute(
        refreshToken.user_id,
      );

      return { token, refresh_token: newRefreshToken };
    }

    return { token };
  }
}

export { CheckUserRefreshTokenService };
