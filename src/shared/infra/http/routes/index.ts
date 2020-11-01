import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import accountsRouter from '@modules/users/infra/http/routes/accounts.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/account', accountsRouter);

export default routes;
