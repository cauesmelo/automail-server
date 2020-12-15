import { injectable, inject } from 'tsyringe';
// import AppError from '@shared/errors/AppError';

import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient';

import IRecipientsRepository from '@modules/recipients/repositories/IRecipientsRepository';

interface IRequest {
  userId: string;
}

@injectable()
class ListRecipientService {
  constructor(
    @inject('RecipientsRepository')
    private recipientsRepository: IRecipientsRepository,
  ) {}

  public async execute({ userId }: IRequest): Promise<Recipient[]> {
    const recipientList = await this.recipientsRepository.getFromUserId(userId);
    return recipientList;
  }
}

export default ListRecipientService;
