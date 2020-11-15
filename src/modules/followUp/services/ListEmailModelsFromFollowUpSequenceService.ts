import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';

import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';

interface IRequest {
  followUpSequenceId: string;
}

@injectable()
class ListEmailModelsFromFollowUpSequenceService {
  constructor(
    @inject('EmailModelsRepository')
    private emailModelsRepository: IEmailModelsRepository,
  ) {}

  public async execute({
    followUpSequenceId,
  }: IRequest): Promise<EmailModel[]> {
    const emailModels = await this.emailModelsRepository.listByFollowUpSequenceId(
      followUpSequenceId,
    );

    if (!emailModels) throw new AppError('no followupsequence found');

    return emailModels;
  }
}

export default ListEmailModelsFromFollowUpSequenceService;
