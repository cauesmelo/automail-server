import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const listsRouter = Router();

listsRouter.use(ensureAuthenticated);

export default listsRouter;
