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
    const followUpSequence = await this.ormRepository.findOne({
      where: {
        id,
      },
      relations: ['emailModel'],
    });
    return followUpSequence;
  }

  public async listByUserId(
    userId: string,
  ): Promise<FollowUpSequence[] | undefined> {
    const followUpSequence = await this.ormRepository.find({
      where: { userId },
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

  public async findDefaultByUserId(userId: string): Promise<FollowUpSequence> {
    const followUpSequence = await this.ormRepository.findOne({
      where: {
        userId,
        title: 'Padrão',
      },
      relations: ['emailModel'],
    });

    if (!followUpSequence) throw new AppError('FollowUp Sequence not found!');

    return followUpSequence;
  }

  public async findByName(
    name: string,
    userId: string,
  ): Promise<FollowUpSequence> {
    let title = '';

    if (name.toUpperCase() === 'AUTOMAIL') {
      title = 'Padrão';
    } else {
      const result = name.match(`automail\\+(.*)`);
      if (result) {
        // eslint-disable-next-line
        title = result[1];
      } else {
        title = 'Padrão';
      }
    }

    let followUpSequence = await this.ormRepository.findOne({
      where: {
        userId,
        title,
      },
      relations: ['emailModel'],
    });

    if (!followUpSequence) {
      followUpSequence = await this.ormRepository.findOne({
        where: {
          userId,
          title: 'Padrão',
        },
        relations: ['emailModel'],
      });
    }

    if (!followUpSequence)
      throw new AppError(
        "No followUpSequence found. Should've returned the standard sequence.",
      );

    return followUpSequence;
  }
}

export default FollowUpSequenceRepository;
