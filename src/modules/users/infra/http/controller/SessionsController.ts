import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

export default class SessionsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { idToken } = request.body;

    if (!idToken) throw new AppError('Invalid request. Missing token.');

    const authenticateUser = container.resolve(AuthenticateUserService);

    const data = await authenticateUser.execute(idToken);

    return response.json(data);
  }
}
