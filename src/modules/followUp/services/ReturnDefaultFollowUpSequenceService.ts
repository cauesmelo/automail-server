import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';

import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ReturnDefaultFollowUpSequenceService {
  constructor(
    @inject('EmailModelsRepository')
    private emailModelsRepository: IEmailModelsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<EmailModel> {
    const emailModel = await this.emailModelsRepository.findDefaultByUserId(
      userId,
    );

    if (!emailModel) throw new AppError('no followupsequence found');

    return emailModel;
  }
}

export default ReturnDefaultFollowUpSequenceService;
