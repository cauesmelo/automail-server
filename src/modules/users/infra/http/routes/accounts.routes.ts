import { Router } from 'express';

import AccountsController from '@modules/users/infra/http/controller/AccountsController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const accountsRouter = Router();
const accountsController = new AccountsController();

accountsRouter.get('/', ensureAuthenticated, accountsController.show);

accountsRouter.put('/', ensureAuthenticated, accountsController.update);

accountsRouter.put('/name', ensureAuthenticated, accountsController.updateName);
export default accountsRouter;
