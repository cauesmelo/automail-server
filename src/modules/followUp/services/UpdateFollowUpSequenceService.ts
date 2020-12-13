import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  id: string;
  title: string;
}

@injectable()
class ReturnDefaultFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({ id, title }: IRequest): Promise<FollowUpSequence> {
    const validation = /^[a-zA-Z0-9 ]*$/;

    if (validation.test(title)) {
      const followUp = await this.followUpSequenceRepository.findById(id);

      if (!followUp) throw new AppError('no followupsequence found');

      followUp.title = title;

      return this.followUpSequenceRepository.save(followUp);
    }
    throw new AppError('Invalid title format.');
  }
}

export default ReturnDefaultFollowUpSequenceService;
