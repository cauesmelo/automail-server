import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userData: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(
      userData.email,
    );

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = await this.usersRepository.create({
      name: userData.name,
      companyName: userData.companyName,
      deleted: userData.deleted,
      email: userData.email,
      premium: userData.premium,
      userType: userData.userType,
    });

    return user;
  }
}
