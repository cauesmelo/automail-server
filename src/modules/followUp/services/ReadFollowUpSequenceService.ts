import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  followUpSequenceId: string;
}

@injectable()
class ReturnDefaultFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({
    followUpSequenceId,
  }: IRequest): Promise<FollowUpSequence> {
    const followUp = await this.followUpSequenceRepository.findById(
      followUpSequenceId,
    );

    if (!followUp) throw new AppError('no followupsequence found');

    return followUp;
  }
}

export default ReturnDefaultFollowUpSequenceService;
