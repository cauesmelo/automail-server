import { getRepository, Repository } from 'typeorm';
import Email from '@modules/emails/infra/typeorm/entities/Recipients';

import ICreateEmailDTO from '@modules/emails/dtos/ICreateEmailDTO';
import IFindAllFromListDTO from '@modules/emails/dtos/IFindAllFromListDTO';

import IEmailsRepository from '@modules/emails/repositories/IEmailsRepository';

class EmailsRepository implements IEmailsRepository {
  private ormRepository: Repository<Email>;

  constructor() {
    this.ormRepository = getRepository(Email);
  }

  public async findById(id: string): Promise<Email | undefined> {
    const list = await this.ormRepository.findOne(id);

    return list;
  }

  public async findAllFromList(
    data: IFindAllFromListDTO,
  ): Promise<Email[] | undefined> {
    const list = await this.ormRepository.find({
      where: {
        listId: data.listId,
      },
    });

    return list;
  }

  public async save(email: Email): Promise<Email> {
    return this.ormRepository.save(email);
  }

  // used any here because of a bug in typeorm
  // https://github.com/typeorm/typeorm/issues/2904
  public async create(emailData: ICreateEmailDTO): Promise<any> {
    const email = this.ormRepository.create(emailData as any);
    await this.ormRepository.save(email);
    return email;
  }

  public async delete(emailId: string): Promise<void> {
    this.ormRepository.delete(emailId);
  }
}

export default EmailsRepository;
