import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import emailsRouter from '@modules/emails/infra/http/routes/emails.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/emails', emailsRouter);

export default routes;
