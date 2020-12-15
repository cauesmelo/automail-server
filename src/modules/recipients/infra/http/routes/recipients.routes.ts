import { Router } from 'express';

import RecipientsController from '@modules/recipients/infra/http/controller/RecipientsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

// TODO CHECK IF THE ORIGIN OF THE REQUEST IS VALID

const recipientsRouter = Router();
const recipientsController = new RecipientsController();

// TODO DO SOME SORT OF VALIDATION OF API
recipientsRouter.post('/', recipientsController.create);

recipientsRouter.get(
  '/:userId',
  ensureAuthenticated,
  recipientsController.index,
);

// recipientsRouter.put('/', recipientsController.update);

// recipientsRouter.put('/name', recipientsController.updateName);

export default recipientsRouter;
