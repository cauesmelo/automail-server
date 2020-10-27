import { injectable, inject } from 'tsyringe';
import Email from '@modules/emails/infra/typeorm/entities/Recipients';
import ICreateEmailDTO from '@modules/emails/dtos/ICreateEmailDTO';
import AppError from '@shared/errors/AppError';
import IListsRepository from '@modules/lists/repositories/IListsRepository';
import IEmailsRepository from '../repositories/IEmailsRepository';

// TODO
// Add verification for duplicate emails

@injectable()
export default class CreateEmailService {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({
    name,
    listId,
    email,
  }: ICreateEmailDTO): Promise<Email> {
    const list = await this.listsRepository.findById(listId);
    if (!list) {
      throw new AppError('List not found!');
    }

    const emailCreated = await this.emailsRepository.create({
      name,
      listId,
      email,
    });

    return emailCreated;
  }
}
