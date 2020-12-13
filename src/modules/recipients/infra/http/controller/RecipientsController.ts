import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateRecipientService from '@modules/recipients/services/CreateRecipientService';

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

    console.log(originalEmail);

    return response.json(originalEmail);
  }
}
