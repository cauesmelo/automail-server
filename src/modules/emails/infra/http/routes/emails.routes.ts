import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EmailsController from '@modules/emails/infra/http/controllers/EmailsController';

const emailsRouter = Router();
const emailsController = new EmailsController();

emailsRouter.use(ensureAuthenticated);

emailsRouter.get('/:listId', emailsController.index);

emailsRouter.post('/', emailsController.create);

// emailsRouter.delete('/:emailId', emailsController.delete);

// emailsRouter.put('/:emailId', emailsController.put);

export default emailsRouter;
