import { Router } from 'express';

import RecipientsController from '@modules/recipients/infra/http/controller/RecipientsController';

// TODO CHECK IF THE ORIGIN OF THE REQUEST IS VALID

const recipientsRouter = Router();
const recipientsController = new RecipientsController();

recipientsRouter.post('/', recipientsController.create);

// recipientsRouter.put('/', recipientsController.update);

// recipientsRouter.put('/name', recipientsController.updateName);

export default recipientsRouter;
