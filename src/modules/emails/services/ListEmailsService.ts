import { injectable, inject } from 'tsyringe';
import Email from '@modules/emails/infra/typeorm/entities/Email';
import IFindAllFromListDTO from '@modules/emails/dtos/IFindAllFromListDTO';
import IEmailsRepository from '../repositories/IEmailsRepository';

@injectable()
export default class EmailEmailsService {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,
  ) {}

  public async execute({
    listId,
  }: IFindAllFromListDTO): Promise<Email[] | undefined> {
    const email = await this.emailsRepository.findAllFromList({
      listId,
    });

    return email;
  }
}
