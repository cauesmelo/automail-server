import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';
import { OAuth2Client } from 'google-auth-library';

interface IRequest {
  id: string;
  idToken: string;
}

@injectable()
class SendEmailService {
  constructor(
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Recipient | undefined> {
    const recipient = await this.recipientsRepository.getById(id);
    if (!recipient) throw new AppError('Invalid recipient id.');

    const msgIdProcessed = recipient.msgId.substring(
      1,
      recipient.msgId.length - 1,
    );

    console.log(msgIdProcessed);
    console.log(recipient.userId);

    // get the msg

    // const msg = await Axios.get(
    //   `https://gmail.googleapis.com/gmail/v1/users/${recipient.userId}/messages/${msgIdProcessed}`,
    // );

    // console.log(msg);

    // add content

    // change to address

    // send

    return undefined;
  }
}

export default SendEmailService;
