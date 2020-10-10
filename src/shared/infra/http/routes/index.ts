import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import listsRouter from '@modules/lists/infra/http/routes/lists.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import emailsRouter from '@modules/emails/infra/http/routes/emails.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/lists', listsRouter);

routes.use('/users', usersRouter);

routes.use('/emails', emailsRouter);

export default routes;
