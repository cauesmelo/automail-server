import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private emailModelRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const followUpSequence = await this.emailModelRepository.findById(id);

    if (!followUpSequence) throw new AppError('Follow up sequence not found.');

    if (followUpSequence?.title === 'Padrão')
      throw new AppError('Cannot delete default follow up sequence.');

    await this.emailModelRepository.delete(id);
  }
}

export default DeleteFollowUpSequenceService;
