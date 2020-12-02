import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateOriginalEmailService from '@modules/recipients/services/CreateOriginalEmailService';

export default class RecipientsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { msgId, subject, fromEmail, toEmail } = request.body;

    const createOriginalEmail = container.resolve(CreateOriginalEmailService);

    const originalEmail = await createOriginalEmail.execute({
      msgId,
      subject,
      fromEmail,
      toEmail,
    });

    console.log(originalEmail);

    return response.json(originalEmail);
  }
}
