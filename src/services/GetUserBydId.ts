import { getRepository } from 'typeorm';

import { User } from '../models/User';

const uuidv4Regex = new RegExp(
  /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,
);

class GetUserById {
  public static async execute(id: string): Promise<User> {
    const isValidUuid = uuidv4Regex.test(id);
    if (!isValidUuid) {
      throw new Error('Uuid is in invalid format!');
    }

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }
}

export { GetUserById };
