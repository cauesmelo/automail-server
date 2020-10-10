import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import List from '@modules/lists/infra/typeorm/entities/List';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  id: string;
  name: string;
}

@injectable()
export default class RenameListService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ id, name }: IRequest): Promise<List> {
    const list = await this.listsRepository.findById(id);
    if (!list) {
      throw new AppError('List not found!');
    }

    list.name = name;

    await this.listsRepository.save(list);

    return list;
  }
}
