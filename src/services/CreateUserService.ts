import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { AppError } from '../errors/AppError';
import { User } from '../models/User';

interface Request {
  email: string;
  username: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, username, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const isUserAlreadyExists = await usersRepository.findOne({
      where: { username },
    });

    if (isUserAlreadyExists) {
      throw new AppError('This username is already in use!');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      username,
      password: hashedPassword,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
