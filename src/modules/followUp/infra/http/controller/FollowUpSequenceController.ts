import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateFollowUpSequenceService from '@modules/followUp/services/CreateFollowUpSequenceService';
import ListFollowUpSequenceService from '@modules/followUp/services/ListFollowUpSequenceService';
import ListEmailModelsFromFollowUpSequenceService from '@modules/followUp/services/ListEmailModelsFromFollowUpSequenceService';
import UpdateFollowUpSequenceService from '@modules/followUp/services/UpdateFollowUpSequenceService';
import DeleteFollowUpSequenceService from '@modules/followUp/services/DeleteFollowUpSequenceService';
import CreateEmailModelService from '@modules/followUp/services/CreateEmailModelService';

export default class FollowUpSequenceControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const listFollowUpSequenceService = container.resolve(
      ListFollowUpSequenceService,
    );

    const list = listFollowUpSequenceService.execute({
      userId,
    });
    return response.json(list);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, title } = request.body;

    const updateFollowUpSequenceService = container.resolve(
      UpdateFollowUpSequenceService,
    );

    const updatedFollowUpSequence = updateFollowUpSequenceService.execute({
      id,
      title,
    });
    return response.json(updatedFollowUpSequence);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const listEmailModelsFromFollowUpSequenceService = container.resolve(
      ListEmailModelsFromFollowUpSequenceService,
    );

    const list = listEmailModelsFromFollowUpSequenceService.execute({
      id,
    });
    return response.json(list);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteFollowUpSequenceService = container.resolve(
      DeleteFollowUpSequenceService,
    );

    deleteFollowUpSequenceService.execute({
      id,
    });
    return response.json().status(200);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, userId } = request.body;

    const createFollowUpSequence = container.resolve(
      CreateFollowUpSequenceService,
    );

    const followUpSequence = await createFollowUpSequence.execute({
      title,
      userId,
    });

    const createEmailModel = container.resolve(CreateEmailModelService);

    await createEmailModel.execute({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'placeholder text one',
      daysAfter: 3,
    });

    await createEmailModel.execute({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'placeholder text two',
      daysAfter: 8,
    });

    await createEmailModel.execute({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'placeholder text three',
      daysAfter: 15,
    });

    await createEmailModel.execute({
      userId,
      followUpSequenceId: followUpSequence.id,
      content: 'placeholder text four',
      daysAfter: 25,
    });

    return response.json(followUpSequence);
  }
}
