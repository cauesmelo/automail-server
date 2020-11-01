import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IBumpSettingsRepository from '@modules/users/repositories/IBumpSettingsRepository';
import BumpSettingsRepository from '@modules/users/infra/typeorm/repositories/BumpSettingsRepository';

import IEmailsRepository from '@modules/emails/repositories/IEmailsRepository';
import EmailsRepository from '@modules/emails/infra/typeorm/repositories/EmailsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IBumpSettingsRepository>(
  'BumpSettingsRepository',
  BumpSettingsRepository,
);

container.registerSingleton<IEmailsRepository>(
  'EmailsRepository',
  EmailsRepository,
);
