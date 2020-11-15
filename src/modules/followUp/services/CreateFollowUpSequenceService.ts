import { injectable, inject } from 'tsyringe';

import FollowUpSequence from '@modules/followUp/infra/typeorm/entities/FollowUpSequence';
import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';
import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';

interface IRequest {
  title: string;
  userId: string;
}

@injectable()
class CreateFollowUpSequenceService {
  constructor(
    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,

    @inject('EmailModelsRepository')
    private emailModelRepository: IEmailModelsRepository,
  ) {}

  public async execute({ title, userId }: IRequest): Promise<FollowUpSequence> {
    const followUpSequence = await this.followUpSequenceRepository.create({
      title,
      userId,
    });

    await this.emailModelRepository.create({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: `Olá, só queria ter certeza que recebeu o e-mail abaixo.
        Obrigado!`,
      daysAfter: 3,
    });

    await this.emailModelRepository.create({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'Só para confirmar, conseguiu receber o e-mail abaixo?',
      daysAfter: 8,
    });

    await this.emailModelRepository.create({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'Tentando entrar em contato novamente.',
      daysAfter: 15,
    });

    await this.emailModelRepository.create({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'Pensei em entrar em contato novamente, conseguiu ler o e-mail?',
      daysAfter: 25,
    });

    return followUpSequence;
  }
}

export default CreateFollowUpSequenceService;
