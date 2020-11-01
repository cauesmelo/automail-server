import { getRepository, Repository } from 'typeorm';
import BumpSettings from '@modules/users/infra/typeorm/entities/BumpSettings';

import IBumpSettingsRepository from '@modules/users/repositories/IBumpSettingsRepository';

class BumpSettingsRepository implements IBumpSettingsRepository {
  private ormRepository: Repository<BumpSettings>;

  constructor() {
    this.ormRepository = getRepository(BumpSettings);
  }

  public async findById(id: string): Promise<BumpSettings | undefined> {
    const bumpSettings = await this.ormRepository.findOne(id);
    return bumpSettings;
  }

  public async findByEmail(email: string): Promise<BumpSettings | undefined> {
    const bumpSettings = await this.ormRepository.findOne(email);
    return bumpSettings;
  }

  public async save(bumpSettings: BumpSettings): Promise<BumpSettings> {
    return this.ormRepository.save(bumpSettings);
  }

  public async create(userId: string): Promise<BumpSettings> {
    const bumpSettings = this.ormRepository.create({
      userId,
      timezone: 'gmt-3',
      bumpDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      bumpCopy: false,
    });
    await this.ormRepository.save(bumpSettings);
    return bumpSettings;
  }
}

export default BumpSettingsRepository;
