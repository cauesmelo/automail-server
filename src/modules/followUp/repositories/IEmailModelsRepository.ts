import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';
import ICreateEmailModelDTO from '@modules/followUp/dtos/ICreateEmailModelDTO';

export default interface IEmailModelsRepository {
  findById(id: string): Promise<EmailModel | undefined>;
  create(data: ICreateEmailModelDTO): Promise<EmailModel>;
  save(emailModel: EmailModel): Promise<EmailModel>;
  delete(id: string): Promise<void>;
}
