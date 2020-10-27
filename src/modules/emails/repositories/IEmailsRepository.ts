import Email from '@modules/emails/infra/typeorm/entities/Recipients';
import ICreateEmailDTO from '@modules/emails/dtos/ICreateEmailDTO';
import IFindAllFromListDTO from '@modules/emails/dtos/IFindAllFromListDTO';

export default interface IEmailsRepository {
  findById(id: string): Promise<Email | undefined>;
  create(data: ICreateEmailDTO): Promise<Email>;
  save(email: Email): Promise<Email>;
  findAllFromList(data: IFindAllFromListDTO): Promise<Email[] | undefined>;
  delete(emailId: string): Promise<void>;
}
