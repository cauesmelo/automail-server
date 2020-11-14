import { injectable, inject } from 'tsyringe';

import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequencesRepository')
    private emailModelRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.emailModelRepository.delete(id);
  }
}

export default DeleteFollowUpSequenceService;
