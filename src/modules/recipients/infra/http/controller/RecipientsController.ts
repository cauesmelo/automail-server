import { Request, Response } from 'express';
// import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

// import UpdateNameService from '@modules/users/services/UpdateNameService';

export default class RecipientsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { msgId, subject, from, to } = request.body;

    console.log(msgId + subject + from + to);

    return response.json();
  }
}
