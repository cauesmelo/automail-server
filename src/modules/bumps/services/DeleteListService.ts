import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  listId: string;
}

@injectable()
export default class DeleteListService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ listId }: IRequest): Promise<void> {
    const list = await this.listsRepository.findById(listId);
    if (!list) {
      throw new AppError('List not found!');
    }
    await this.listsRepository.delete(listId);
  }
}
