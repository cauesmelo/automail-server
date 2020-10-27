import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListsController from '@modules/lists/infra/http/controllers/ListsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.use(ensureAuthenticated);

listsRouter.get('/', listsController.index);

listsRouter.post('/', listsController.create);

listsRouter.delete('/:listId', listsController.delete);

listsRouter.put('/:listId', listsController.put);

export default listsRouter;
