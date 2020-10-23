import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsControler {
  public async create(request: Request, response: Response): Promise<Response> {
    const { idToken } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const data = await authenticateUser.execute(idToken);

    return response.json(data);
  }
}
