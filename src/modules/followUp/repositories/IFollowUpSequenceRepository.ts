import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';
import ICreateFollowUpSequenceDTO from '../dtos/ICreateFollowUpSequenceDTO';

export default interface IFollowUpSequenceRepository {
  findById(id: string): Promise<FollowUpSequence | undefined>;
  findByName(name: string): Promise<FollowUpSequence | undefined>;
  listByEmail(email: string): Promise<FollowUpSequence[] | undefined>;
  create(data: ICreateFollowUpSequenceDTO): Promise<FollowUpSequence>;
  save(followUp: FollowUpSequence): Promise<FollowUpSequence>;
}
