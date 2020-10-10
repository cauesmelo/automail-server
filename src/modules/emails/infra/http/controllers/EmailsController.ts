import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEmailService from '@modules/emails/services/CreateEmailService';
import ListEmailsService from '@modules/emails/services/ListEmailsService';
// import DeleteEmailService from '@modules/emails/services/DeleteEmailService';
// import RenameEmailService from '@modules/emails/services/RenameEmailService';

export default class EmailsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, listId, email } = request.body;

    const createEmail = container.resolve(CreateEmailService);

    const emailCreated = await createEmail.execute({
      name,
      listId,
      email,
    });

    return response.json(emailCreated);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { listId } = request.params;

    const listEmails = container.resolve(ListEmailsService);

    const listOfEmails = await listEmails.execute({
      listId,
    });

    return response.json(listOfEmails);
  }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { emailId } = request.params;

  //   const deleteEmail = container.resolve(DeleteEmailService);

  //   await deleteEmail.execute({
  //     emailId,
  //   });

  //   return response.status(200).json();
  // }

  // public async put(request: Request, response: Response): Promise<Response> {
  //   const { name } = request.body;
  //   const { emailId } = request.params;

  //   const renameEmail = container.resolve(RenameEmailService);

  //   const email = await renameEmail.execute({
  //     id: emailId,
  //     name,
  //   });

  //   return response.json(email);
  // }
}
