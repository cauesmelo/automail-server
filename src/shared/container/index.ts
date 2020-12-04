import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IBumpSettingsRepository from '@modules/users/repositories/IBumpSettingsRepository';
import BumpSettingsRepository from '@modules/users/infra/typeorm/repositories/BumpSettingsRepository';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';
import FollowUpSequenceRepository from '@modules/followUp/infra/typeorm/repositories/FollowUpSequenceRepository';

import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';
import EmailModelsRepository from '@modules/followUp/infra/typeorm/repositories/EmailModelsRepository';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';
import RecipientsRepository from '@modules/recipients/infra/typeorm/repositories/RecipientsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IBumpSettingsRepository>(
  'BumpSettingsRepository',
  BumpSettingsRepository,
);

container.registerSingleton<IFollowUpSequenceRepository>(
  'FollowUpSequenceRepository',
  FollowUpSequenceRepository,
);

container.registerSingleton<IRecipientsRepository>(
  'RecipientsRepository',
  RecipientsRepository,
);

container.registerSingleton<IEmailModelsRepository>(
  'EmailModelsRepository',
  EmailModelsRepository,
);
