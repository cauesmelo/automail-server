import { Router } from 'express';

import EmailModelsController from '@modules/followUp/infra/http/controller/EmailModelsController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const emailModelRouter = Router();
const emailModelController = new EmailModelsController();

emailModelRouter.put('/', ensureAuthenticated, emailModelController.update);

emailModelRouter.delete(
  '/:id',
  ensureAuthenticated,
  emailModelController.delete,
);

emailModelRouter.post('/', ensureAuthenticated, emailModelController.create);

export default emailModelRouter;
