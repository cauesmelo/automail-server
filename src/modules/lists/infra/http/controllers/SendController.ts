import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendToListService from '@modules/lists/services/SendToListService';

export default class ListsController {
  public async send(request: Request, response: Response): Promise<Response> {
    const { listId, modelId } = request.body;
    const userId = request.user.id;

    const sendList = container.resolve(SendToListService);

    await sendList.execute({
      listId,
      modelId,
      userId,
    });

    return response.status(200).json();
  }
}