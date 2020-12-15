import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateRecipientService from '@modules/recipients/services/CreateRecipientService';
import ListRecipientService from '@modules/recipients/services/ListRecipientService';

export default class RecipientsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      msgId,
      subject,
      fromEmail,
      toEmail,
      sentDate,
      followUpName,
    } = request.body;

    const createRecipient = container.resolve(CreateRecipientService);

    const originalEmail = await createRecipient.execute({
      msgId,
      subject,
      fromEmail,
      toEmail,
      sentDate,
      followUpName,
    });

    return response.json(originalEmail);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const listRecipient = container.resolve(ListRecipientService);

    const recipients = await listRecipient.execute({
      userId,
    });

    return response.json(recipients);
  }
}
