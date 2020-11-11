import { getRepository, Repository } from 'typeorm';
import EmailModels from '@modules/followUp/infra/typeorm/entities/EmailModel';
import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';
import ICreateEmailModelsDTO from '@modules/followUp/dtos/ICreateEmailModelDTO';

class EmailModelsRepository implements IEmailModelsRepository {
  private ormRepository: Repository<EmailModels>;

  constructor() {
    this.ormRepository = getRepository(EmailModels);
  }

  public async findById(id: string): Promise<EmailModels | undefined> {
    const followUpSequence = await this.ormRepository.findOne(id);
    return followUpSequence;
  }

  public async findByName(name: string): Promise<EmailModels | undefined> {
    const followUpSequence = await this.ormRepository.findOne(name);
    return followUpSequence;
  }

  public async listByFollowUpId(
    id: string,
  ): Promise<EmailModels[] | undefined> {
    const followUpSequence = await this.ormRepository.find({
      where: { followUpSequenceId: id },
    });
    return followUpSequence;
  }

  public async save(followUpSequence: EmailModels): Promise<EmailModels> {
    return this.ormRepository.save(followUpSequence);
  }

  public async create(data: ICreateEmailModelsDTO): Promise<void> {
    console.log(data);
  }
}

export default EmailModelsRepository;
