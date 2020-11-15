import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListEmailModelsFromFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<FollowUpSequence> {
    const followUpSequence = await this.followUpSequenceRepository.findById(id);

    if (!followUpSequence) throw new AppError('no followupsequence found');

    return followUpSequence;
  }
}

export default ListEmailModelsFromFollowUpSequenceService;
