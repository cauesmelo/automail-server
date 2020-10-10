import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateListService from '@modules/lists/services/CreateListService';
import ListListsService from '@modules/lists/services/ListListsService';
import DeleteListService from '@modules/lists/services/DeleteListService';
import RenameListService from '@modules/lists/services/RenameListService';

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { listId } = request.params;

    const deleteList = container.resolve(DeleteListService);

    await deleteList.execute({
      listId,
    });

    return response.status(200).json();
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { listId } = request.params;

    const renameList = container.resolve(RenameListService);

    const list = await renameList.execute({
      id: listId,
      name,
    });

    return response.json(list);
  }
}
