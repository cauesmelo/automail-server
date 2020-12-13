import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';
import ICreateFollowUpSequenceDTO from '../dtos/ICreateFollowUpSequenceDTO';

export default interface IFollowUpSequenceRepository {
  findById(id: string): Promise<FollowUpSequence | undefined>;
  listByUserId(id: string): Promise<FollowUpSequence[] | undefined>;
  findDefaultByUserId(userId: string): Promise<FollowUpSequence>;
  findByName(
    name: string,
    userId: string,
  ): Promise<FollowUpSequence | undefined>;
  create(data: ICreateFollowUpSequenceDTO): Promise<FollowUpSequence>;
  save(followUp: FollowUpSequence): Promise<FollowUpSequence>;
  delete(id: string): Promise<void>;
}
