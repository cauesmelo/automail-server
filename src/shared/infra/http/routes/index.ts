import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import listsRouter from '@modules/lists/infra/http/routes/lists.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/lists', listsRouter);

routes.use('/users', usersRouter);

export default routes;
