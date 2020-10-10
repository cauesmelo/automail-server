import { injectable, inject } from 'tsyringe';
import Email from '@modules/emails/infra/typeorm/entities/Email';
import ICreateEmailDTO from '@modules/emails/dtos/ICreateEmailDTO';
import IEmailsRepository from '../repositories/IEmailsRepository';

@injectable()
export default class CreateEmailService {
  constructor(
    @inject('EmailsRepository')
    private emailsRepository: IEmailsRepository,
  ) {}

  public async execute({
    name,
    listId,
    email,
  }: ICreateEmailDTO): Promise<Email> {
    const emailCreated = await this.emailsRepository.create({
      name,
      listId,
      email,
    });

    return emailCreated;
  }
}
