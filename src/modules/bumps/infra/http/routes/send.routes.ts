import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const sendRouter = Router();

sendRouter.use(ensureAuthenticated);

export default sendRouter;
