import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateFollowUpSequenceService from '@modules/followUp/services/CreateFollowUpSequenceService';
import ListFollowUpSequenceService from '@modules/followUp/services/ListFollowUpSequenceService';
import ListEmailModelsFromFollowUpSequenceService from '@modules/followUp/services/ListEmailModelsFromFollowUpSequenceService';
import UpdateFollowUpSequenceService from '@modules/followUp/services/UpdateFollowUpSequenceService';
import DeleteFollowUpSequenceService from '@modules/followUp/services/DeleteFollowUpSequenceService';

export default class FollowUpSequenceControler {
  public async index(request: Request, response: Response): Promise<Response> {
    const { userId } = request.query;
    const listFollowUpSequenceService = container.resolve(
      ListFollowUpSequenceService,
    );

    const list = await listFollowUpSequenceService.execute({
      userId: String(userId),
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
    const { id } = request.params;

    const listEmailModelsFromFollowUpSequenceService = container.resolve(
      ListEmailModelsFromFollowUpSequenceService,
    );

    const list = await listEmailModelsFromFollowUpSequenceService.execute({
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

    return response.json(followUpSequence);
  }
}
