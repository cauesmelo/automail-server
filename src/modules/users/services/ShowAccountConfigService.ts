import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  userEmail: string;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userEmail }: IRequest): Promise<User> {
    const userConfig = await this.usersRepository.findByEmail(userEmail);
    if (!userConfig) {
      throw new AppError('User not found!');
    }

    return userConfig;
  }
}
