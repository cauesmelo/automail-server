import BumpSettings from '@modules/users/infra/typeorm/entities/BumpSettings';

export default interface IBumpSettingsRepository {
  findById(id: string): Promise<BumpSettings | undefined>;
  findByEmail(email: string): Promise<BumpSettings | undefined>;
  create(userId: string): Promise<BumpSettings>;
  save(bumpSettings: BumpSettings): Promise<BumpSettings>;
}
