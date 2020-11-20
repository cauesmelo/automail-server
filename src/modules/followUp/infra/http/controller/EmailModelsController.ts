import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateEmailModelService from '@modules/followUp/services/CreateEmailModelService';
import UpdateEmailModelService from '@modules/followUp/services/UpdateEmailModelService';
import DeleteEmailModelService from '@modules/followUp/services/DeleteEmailModelService';
import ListEmailModelsFromFollowUpSequenceService from '@modules/followUp/services/ListEmailModelsFromFollowUpSequenceService';
import ReturnDefaultFollowUpSequenceService from '@modules/followUp/services/ReturnDefaultFollowUpSequenceService';

export default class EmailModelsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id, content, daysAfter } = request.body;

    const updateEmailModel = container.resolve(UpdateEmailModelService);

    const updatedEmailModel = updateEmailModel.execute({
      id,
      content,
      daysAfter,
    });

    return response.json(updatedEmailModel);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteEmailModel = container.resolve(DeleteEmailModelService);

    deleteEmailModel.execute({
      id,
    });

    return response.json().status(200);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { userId, followUpSequenceId, content, daysAfter } = request.body;
    const createEmailModel = container.resolve(CreateEmailModelService);

    const emailModel = await createEmailModel.execute({
      userId,
      followUpSequenceId,
      content,
      daysAfter,
    });

    return response.json(emailModel);
  }
}
