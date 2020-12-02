import OriginalEmail from '@modules/recipients/infra/typeorm/entities/OriginalEmail';
import ICreateOriginalEmailDTO from '@modules/recipients/dtos/ICreateOriginalEmailDTO';

export default interface IOriginalEmailRepository {
  create(originalEmailData: ICreateOriginalEmailDTO): Promise<OriginalEmail>;
  findById(id: string): Promise<OriginalEmail | undefined>;
  save(originalEmail: OriginalEmail): Promise<OriginalEmail>;
}
