import { injectable, inject } from 'tsyringe';

import IEmailModelsRepository from '@modules/followUp/repositories/IEmailModelsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteEmailModelService {
  constructor(
    @inject('EmailModelsRepository')
    private emailModelRepository: IEmailModelsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.emailModelRepository.delete(id);
  }
}

export default DeleteEmailModelService;
