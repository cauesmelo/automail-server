import { getRepository, Repository } from 'typeorm';
import List from '@modules/lists/infra/typeorm/entities/List';

import ICreateListDTO from '@modules/lists/dtos/ICreateListDTO';
import IFindAllFromUserDTO from '@modules/lists/dtos/IFindAllFromUserDTO';

import IListsRepository from '@modules/lists/repositories/IListsRepository';

class ListsRepository implements IListsRepository {
  private ormRepository: Repository<List>;

  constructor() {
    this.ormRepository = getRepository(List);
  }

  public async findById(id: string): Promise<List | undefined> {
    const list = await this.ormRepository.findOne(id);

    return list;
  }

  public async findAllFromUser(
    data: IFindAllFromUserDTO,
  ): Promise<List[] | undefined> {
    const list = await this.ormRepository.find({
      where: {
        userId: data.userId,
      },
    });

    return list;
  }

  public async save(list: List): Promise<List> {
    return this.ormRepository.save(list);
  }

  // used any here because of a bug in typeorm
  // https://github.com/typeorm/typeorm/issues/2904
  public async create(listData: ICreateListDTO): Promise<any> {
    const list = this.ormRepository.create(listData as any);
    await this.ormRepository.save(list);
    return list;
  }

  public async delete(listId: string): Promise<void> {
    this.ormRepository.delete(listId);
  }
}

export default ListsRepository;
