import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient';
import ICreateRecipientDTO from '@modules/recipients/dtos/ICreateRecipientDTO';

export default interface IRecipientsRepository {
  create(recipient: ICreateRecipientDTO): Promise<Recipient>;
  getById(id: string): Promise<Recipient | undefined>;
  getFromUserId(userId: string): Promise<Recipient[]>;
  save(recipient: Recipient): Promise<Recipient>;
}
