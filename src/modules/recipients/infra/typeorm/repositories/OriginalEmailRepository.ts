import { getRepository, Repository } from 'typeorm';
import OriginalEmail from '@modules/recipients/infra/typeorm/entities/OriginalEmail';

import ICreateOriginalEmailDTO from '@modules/recipients/dtos/ICreateOriginalEmailDTO';

import IOriginalEmailRepository from '@modules/recipients/repositories/IOriginalEmailRepository';

class OriginalEmailRepository implements IOriginalEmailRepository {
  private ormRepository: Repository<OriginalEmail>;

  constructor() {
    this.ormRepository = getRepository(OriginalEmail);
  }

  public async findById(id: string): Promise<OriginalEmail | undefined> {
    const originalEmail = await this.ormRepository.findOne(id);
    return originalEmail;
  }

  public async save(originalEmail: OriginalEmail): Promise<OriginalEmail> {
    return this.ormRepository.save(originalEmail);
  }

  public async create(
    originalEmailData: ICreateOriginalEmailDTO,
  ): Promise<OriginalEmail> {
    const originalEmail = this.ormRepository.create(originalEmailData);
    await this.ormRepository.save(originalEmail);
    return originalEmail;
  }
}

export default OriginalEmailRepository;
