import { injectable, inject } from 'tsyringe';
import List from '@modules/lists/infra/typeorm/entities/List';
import IListsRepository from '../repositories/IListsRepository';

interface IRequest {
  name: string;
  userId: string;
}

@injectable()
export default class CreateListService {
  constructor(
    @inject('ListsRepository')
    private listsRepository: IListsRepository,
  ) {}

  public async execute({ name, userId }: IRequest): Promise<List> {
    const list = await this.listsRepository.create({
      name,
      userId,
    });

    return list;
  }
}
