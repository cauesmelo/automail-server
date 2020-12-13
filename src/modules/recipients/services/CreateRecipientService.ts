import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';
import IFollowUpSequenceRepository from '@modules/followUp/repositories/IFollowUpSequenceRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  subject: string;
  msgId: string;
  fromEmail: string;
  toEmail: string;
  sentDate: Date;
  followUpName: string;
}

@injectable()
class CreateRecipientService {
  constructor(
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FollowUpSequenceRepository')
    private followUpSequenceRepository: IFollowUpSequenceRepository,
  ) {}

  public async execute({
    subject,
    msgId,
    fromEmail,
    toEmail,
    sentDate,
    followUpName,
  }: IRequest): Promise<Recipient> {
    const user = await this.usersRepository.findByEmail(fromEmail);

    if (!user) throw new AppError('User not found.');

    const followUp = await this.followUpSequenceRepository.findByName(
      followUpName,
      user.id,
    );

    if (!followUp) throw new AppError('FollowUpSequence not found.');

    let { daysAfter } = followUp.emailModel[0];

    followUp.emailModel.forEach(item => {
      if (item.daysAfter < daysAfter) {
        daysAfter = item.daysAfter;
      }
    });

    const sentDateObject = new Date(sentDate);

    sentDateObject.setDate(sentDateObject.getDate() + daysAfter);

    const originalEmail = await this.recipientsRepository.create({
      userId: user.id,
      followUpSequenceId: followUp.id,
      subject,
      active: true,
      startDate: sentDate.toLocaleString(),
      lastBumpDay: sentDate.toLocaleString(),
      nextBumpDay: sentDateObject.toLocaleString(),
      msgId,
      fromEmail,
      toEmail,
    });
    return originalEmail;
  }
}

export default CreateRecipientService;
