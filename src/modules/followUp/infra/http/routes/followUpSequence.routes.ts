import { Router } from 'express';

import FollowUpSequenceController from '@modules/followUp/infra/http/controller/FollowUpSequenceController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const followUpSequenceRouter = Router();
const followUpSequenceController = new FollowUpSequenceController();

followUpSequenceRouter.get(
  '/',
  ensureAuthenticated,
  followUpSequenceController.index,
);

followUpSequenceRouter.put(
  '/',
  ensureAuthenticated,
  followUpSequenceController.update,
);

followUpSequenceRouter.delete(
  '/',
  ensureAuthenticated,
  followUpSequenceController.delete,
);

followUpSequenceRouter.post(
  '/',
  ensureAuthenticated,
  followUpSequenceController.create,
);

followUpSequenceRouter.get(
  '/list',
  ensureAuthenticated,
  followUpSequenceController.list,
);

export default followUpSequenceRouter;
