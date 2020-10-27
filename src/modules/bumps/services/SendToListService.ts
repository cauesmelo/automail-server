import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IEmailsRepository from '@modules/emails/repositories/IEmailsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  listId: string;
  modelId: string;
  userId: string;
}

interface MailItem {
  email: string;
  name: string;
}

@injectable()
export default class SendToListService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,

    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ listId, modelId, userId }: IRequest): Promise<void> {
    const list = await this.listsRepository.findById(listId);
    const user = await this.usersRepository.findById(userId);

    // This line it's useless right now, it'll be used in the future.
    if (!modelId) {
      throw new AppError('Please, specify an model for the e-mail.');
    }

    if (!list) {
      throw new AppError('List does not exists.');
    }

    const emailsList = await this.emailsRepository.findAllFromList({ listId });

    if (emailsList === undefined) {
      throw new AppError('Cannot send email to a empty list.');
    }

    const basicTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'basicTemplate.hbs',
    );

    emailsList.forEach(async (e: MailItem) => {
      await this.mailProvider.sendMail({
        to: e.email,
        subject: '[Litterae] E-mail de teste',
        templateData: {
          file: basicTemplate,
          variables: {
            name: e.name,
          },
        },
        from: user?.email,
      });
    });
  }
}