import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<FollowUpSequence[]> {
    const followUpSequence = await this.followUpSequenceRepository.listByUserId(
      userId,
    );

    if (!followUpSequence)
      throw new AppError('no followupsequence found for user');

    return followUpSequence;
  }
}

export default ListFollowUpSequenceService;
