import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import EmailModel from '@modules/followUp/infra/typeorm/entities/EmailModel';

import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';

interface IRequest {
  id: string;
  content: string;
  daysAfter: number;
}

@injectable()
class ListEmailModelsFromFollowUpSequenceService {
  constructor(
    @inject('EmailModelsRepository')
    private emailModelsRepository: IEmailModelsRepository,
  ) {}

  public async execute({
    id,
    content,
    daysAfter,
  }: IRequest): Promise<EmailModel> {
    const emailModel = await this.emailModelsRepository.findById(id);

    if (!emailModel) throw new AppError('no email model found');

    emailModel.content = content;
    emailModel.daysAfter = daysAfter;

    return this.emailModelsRepository.save(emailModel);
  }
}

export default ListEmailModelsFromFollowUpSequenceService;
