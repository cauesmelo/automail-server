import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import accountsRouter from '@modules/users/infra/http/routes/accounts.routes';
import followUpSequenceRouter from '@modules/followUp/infra/http/routes/followUpSequence.routes';
import emailModelsRouter from '@modules/followUp/infra/http/routes/emailModels.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

routes.use('/account', accountsRouter);

routes.use('/followup', followUpSequenceRouter);

routes.use('/emailmodel', emailModelsRouter);

export default routes;
