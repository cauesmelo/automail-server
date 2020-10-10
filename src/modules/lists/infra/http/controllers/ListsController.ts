import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateListService from '@modules/lists/services/CreateListService';
import ListListsService from '@modules/lists/services/ListListsService';

export default class ListsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const userId = request.user.id;

    const createList = container.resolve(CreateListService);

    const list = await createList.execute({
      name,
      userId,
    });

    return response.json(list);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listLists = container.resolve(ListListsService);

    const listOfLists = await listLists.execute({
      userId,
    });

    return response.json(listOfLists);
  }
}
