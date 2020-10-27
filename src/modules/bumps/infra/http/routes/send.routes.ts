import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SendController from '@modules/lists/infra/http/controllers/SendController';

const sendRouter = Router();
const sendController = new SendController();

sendRouter.use(ensureAuthenticated);

sendRouter.post('/', sendController.send);

export default sendRouter;
