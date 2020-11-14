import { injectable, inject } from 'tsyringe';

import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';
import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  title: string;
  userId: string;
}

@injectable()
class CreateFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({ title, userId }: IRequest): Promise<FollowUpSequence> {
    const followUpSequenceEmpty = await this.followUpSequenceRepository.create({
      title,
      userId,
    });
    return followUpSequenceEmpty;
  }
}

export default CreateFollowUpSequenceService;
