import { getRepository, Repository } from 'typeorm';
import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';
import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';
import ICreateEmailModelsDTO from '@modules/followUp/dtos/ICreateEmailModelDTO';
import AppError from '@shared/errors/AppError';

class EmailModelsRepository implements IEmailModelsRepository {
  private ormRepository: Repository<EmailModel>;

  constructor() {
    this.ormRepository = getRepository(EmailModel);
  }

  public async findById(id: string): Promise<EmailModel | undefined> {
    const emailModel = await this.ormRepository.findOne(id);
    return emailModel;
  }

  public async listByFollowUpSequenceId(
    followUpSequenceId: string,
  ): Promise<EmailModel[] | undefined> {
    const emailModelList = await this.ormRepository.find({
      where: { followUpSequenceId },
    });
    return emailModelList;
  }

  public async save(emailModel: EmailModel): Promise<EmailModel> {
    return this.ormRepository.save(emailModel);
  }

  public async create(data: ICreateEmailModelsDTO): Promise<EmailModel> {
    const emailModel = this.ormRepository.create(data);
    await this.ormRepository.save(emailModel);
    return emailModel;
  }

  public async delete(id: string): Promise<void> {
    const emailModel = await this.ormRepository.findOne(id);

    if (!emailModel) throw new AppError('Email Model not found!');

    await this.ormRepository.delete(emailModel);
  }
}
export default EmailModelsRepository;
