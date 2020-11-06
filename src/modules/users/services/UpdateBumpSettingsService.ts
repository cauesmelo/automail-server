import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

export type DaysOfWeek =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

interface IRequest {
  userEmail: string;
  timezone: string;
  days: DaysOfWeek[];
  startHour: string;
  endHour: string;
  copyBool: boolean;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userEmail,
    timezone,
    days,
    startHour,
    endHour,
    copyBool,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(userEmail);
    if (!user) {
      throw new AppError('User not found!');
    }

    user.bumpSettings.bumpCopy = copyBool;
    user.bumpSettings.timezone = timezone;
    user.bumpSettings.bumpDays = days;
    user.bumpSettings.bumpTimeEnd = `${
      endHour.length === 2 ? endHour : `0${endHour}`
    }:00:00`;
    user.bumpSettings.bumpTimeStart = `${
      startHour.length === 2 ? startHour : `0${startHour}`
    }:00:00`;

    return this.usersRepository.save(user);
  }
}
