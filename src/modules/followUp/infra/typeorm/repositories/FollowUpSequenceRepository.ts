import { getRepository, Repository } from 'typeorm';
import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';
import AppError from '@shared/errors/AppError';
import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';
import ICreateFollowUpSequenceDTO from '@modules/followUp/dtos/ICreateFollowUpSequenceDTO';

class FollowUpSequenceRepository implements IFollowUpSequenceRepository {
  private ormRepository: Repository<FollowUpSequence>;

  constructor() {
    this.ormRepository = getRepository(FollowUpSequence);
  }

  public async findById(id: string): Promise<FollowUpSequence | undefined> {
    const followUpSequence = await this.ormRepository.findOne(id);
    return followUpSequence;
  }

  public async findByName(name: string): Promise<FollowUpSequence | undefined> {
    const followUpSequence = await this.ormRepository.findOne(name);
    return followUpSequence;
  }

  public async listByEmail(
    email: string,
  ): Promise<FollowUpSequence[] | undefined> {
    const followUpSequence = await this.ormRepository.find({
      where: { userEmail: email },
    });
    return followUpSequence;
  }

  public async save(
    followUpSequence: FollowUpSequence,
  ): Promise<FollowUpSequence> {
    return this.ormRepository.save(followUpSequence);
  }

  public async create(
    data: ICreateFollowUpSequenceDTO,
  ): Promise<FollowUpSequence> {
    const followUpSequence = this.ormRepository.create(data);
    await this.ormRepository.save(followUpSequence);
    return followUpSequence;
  }

  public async delete(id: string): Promise<void> {
    const followUpSequence = await this.ormRepository.findOne(id);

    if (!followUpSequence) throw new AppError('FollowUp Sequence not found!');

    await this.ormRepository.delete(followUpSequence);
  }
}

export default FollowUpSequenceRepository;
