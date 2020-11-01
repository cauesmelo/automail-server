import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ShowAccountConfigService from '@modules/users/services/ShowAccountConfigService';

export default class AccountsControler {
  public async show(request: Request, response: Response): Promise<Response> {
    const { userEmail } = request.query as any;

    if (!userEmail) {
      throw new AppError('Invalid request.');
    }

    const showAccountConfig = container.resolve(ShowAccountConfigService);

    const userConfig = await showAccountConfig.execute({ userEmail });

    return response.json(userConfig);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { name, email, oldPassword, password } = request.body;
  //   const user_id = request.user.id;

  //   const updateProfile = container.resolve(UpdateProfileService);

  //   const user = await updateProfile.execute({
  //     user_id,
  //     name,
  //     email,
  //     oldPassword,
  //     password,
  //   });

  //   return response.json(classToClass(user));
  // }
}
