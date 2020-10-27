import { injectable, inject } from 'tsyringe';
import Email from '@modules/emails/infra/typeorm/entities/Recipients';
import IFindAllFromListDTO from '@modules/emails/dtos/IFindAllFromListDTO';
import AppError from '@shared/errors/AppError';
import IListsRepository from '@modules/lists/repositories/IListsRepository';
import IEmailsRepository from '../repositories/IEmailsRepository';

@injectable()
export default class EmailEmailsService {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,

    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({
    listId,
  }: IFindAllFromListDTO): Promise<Email[] | undefined> {
    const list = await this.listsRepository.findById(listId);
    if (!list) {
      throw new AppError('List not found!');
    }

    const email = await this.emailsRepository.findAllFromList({
      listId,
    });

    return email;
  }
}
