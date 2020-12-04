import { getRepository, Repository } from 'typeorm';
import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient';

import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';

class RecipientsRepository implements IRecipientsRepository {
  private ormRepository: Repository<Recipient>;

  constructor() {
    this.ormRepository = getRepository(Recipient);
  }

  public async getById(id: string): Promise<Recipient | undefined> {
    const recipient = await this.ormRepository.findOne(id);
    return recipient;
  }

  public async getFromUserId(id: string): Promise<Recipient[]> {
    const recipients = await this.ormRepository.find({
      where: { userId: id },
    });
    return recipients;
  }

  public async save(recipient: Recipient): Promise<Recipient> {
    return this.ormRepository.save(recipient);
  }

  public async create(recipientData: ICreateRecipientDTO): Promise<Recipient> {
    const recipient = this.ormRepository.create(recipientData);
    await this.ormRepository.save(recipient);
    return recipient;
  }
}

export default RecipientsRepository;
