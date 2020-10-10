import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IListsRepository from '@modules/lists/repositories/IListsRepository';
import ListsRepository from '@modules/lists/infra/typeorm/repositories/ListsRepository';

import IEmailsRepository from '@modules/emails/repositories/IEmailsRepository';
import EmailsRepository from '@modules/emails/infra/typeorm/repositories/EmailsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IListsRepository>(
  'ListsRepository',
  ListsRepository,
);

container.registerSingleton<IEmailsRepository>(
  'EmailsRepository',
  EmailsRepository,
);
