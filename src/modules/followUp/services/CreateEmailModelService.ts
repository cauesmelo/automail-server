import { injectable, inject } from 'tsyringe';

import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';
// import AppError from '@shared/errors/AppError';

import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';

interface IRequest {
  userId: string;
  followUpSequenceId: string;
  content: string;
  daysAfter: number;
}

@injectable()
class CreateEmailModelService {
  constructor(
    @inject('EmailModelsRepository')
    private emailModelRepository: IEmailModelsRepository,
  ) {}

  public async execute({
    userId,
    followUpSequenceId,
    content,
    daysAfter,
  }: IRequest): Promise<EmailModel> {
    const emailModel = await this.emailModelRepository.create({
      userId,
      followUpSequenceId,
      content,
      daysAfter,
    });
    return emailModel;
  }
}

export default CreateEmailModelService;
