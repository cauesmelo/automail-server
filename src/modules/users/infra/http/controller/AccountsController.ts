import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ShowAccountConfigService from '@modules/users/services/ShowAccountConfigService';
import UpdateBumpSettingsService from '@modules/users/services/UpdateBumpSettingsService';
import UpdateNameService from '@modules/users/services/UpdateNameService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      dataForm: { timezone, days, startHour, endHour, copy },
      userEmail,
    } = request.body;

    const copyBool = !!copy[0];

    const updateBumpSettings = container.resolve(UpdateBumpSettingsService);

    const bumpSettings = await updateBumpSettings.execute({
      userEmail,
      timezone,
      days,
      startHour,
      endHour,
      copyBool,
    });
    return response.json(bumpSettings);
  }

  public async updateName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { username, userEmail } = request.body;

    const updateName = container.resolve(UpdateNameService);

    const user = await updateName.execute({
      userEmail,
      username,
    });

    return response.json(user);
  }
}
