import { injectable, inject } from 'tsyringe';
import List from '@modules/lists/infra/typeorm/entities/List';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  userId: string;
}

@injectable()
export default class ListListsService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<List[] | undefined> {
    const list = await this.listsRepository.findAllFromUser({
      userId,
    });

    return list;
  }
}
