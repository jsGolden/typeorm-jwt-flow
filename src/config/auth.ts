import dayjs from 'dayjs';

export default {
  jwt: {
    secret: '279df161cd47b1a59201a30417f0c327',
    expiresIn: '25s',
    refreshTokenExpiresIn: dayjs().add(4, 'day').unix(),
  },
};
