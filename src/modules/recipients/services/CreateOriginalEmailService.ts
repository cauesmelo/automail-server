import { injectable, inject } from 'tsyringe';

import OriginalEmail from '@modules/recipients/infra/typeorm/entities/OriginalEmail';

import IOriginalEmailRepository from '@modules/recipients/repositories/IOriginalEmailRepository';

interface IRequest {
  subject: string;
  msgId: string;
  fromEmail: string;
  toEmail: string;
}

@injectable()
class CreateOriginalEmailService {
  constructor(
    @inject('OriginalEmailRepository')
    private originalEmailRepository: IOriginalEmailRepository,
  ) {}

  public async execute({
    subject,
    msgId,
    fromEmail,
    toEmail,
  }: IRequest): Promise<OriginalEmail> {
    const originalEmail = await this.originalEmailRepository.create({
      subject,
      msgId,
      fromEmail,
      toEmail,
    });
    return originalEmail;
  }
}

export default CreateOriginalEmailService;
