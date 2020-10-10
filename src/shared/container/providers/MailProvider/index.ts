import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import GoogleMailProvider from './implementations/GoogleMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  google: container.resolve(GoogleMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
