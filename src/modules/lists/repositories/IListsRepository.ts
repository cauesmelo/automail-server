import List from '@modules/lists/infra/typeorm/entities/List';
import ICreateListDTO from '@modules/lists/dtos/ICreateListDTO';
import IFindAllFromUserDTO from '@modules/lists/dtos/IFindAllFromUserDTO';

export default interface IListsRepository {
  findById(id: string): Promise<List | undefined>;
  create(data: ICreateListDTO): Promise<List>;
  save(list: List): Promise<List>;
  findAllFromUser(data: IFindAllFromUserDTO): Promise<List[] | undefined>;
}
