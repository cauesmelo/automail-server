import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import CreateFollowUpSequenceService from '@modules/followUp/services/CreateFollowUpSequenceService';
import ListFollowUpSequenceService from '@modules/followUp/services/ListFollowUpSequenceService';
import UpdateFollowUpSequenceService from '@modules/followUp/services/UpdateFollowUpSequenceService';
import DeleteFollowUpSequenceService from '@modules/followUp/services/DeleteFollowUpSequenceService';
import ReturnDefaultFollowUpSequenceService from '@modules/followUp/services/ReturnDefaultFollowUpSequenceService';

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

  public async detail(request: Request, response: Response): Promise<Response> {
    console.log(request.params);

    return response.json();
  }

  public async default(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { userId } = request.params;

    const returnDefaultFollowUp = container.resolve(
      ReturnDefaultFollowUpSequenceService,
    );

    const followUpSequence = await returnDefaultFollowUp.execute({
      userId: String(userId),
    });

    return response.json(followUpSequence);
  }
}
