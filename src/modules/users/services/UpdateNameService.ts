import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  username: string;
  userEmail: string;
}

@injectable()
export default class UpdateNameService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userEmail, username }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(userEmail);
    if (!user) {
      throw new AppError('User not found!');
    }

    user.name = username;

    return this.usersRepository.save(user);
  }
}
