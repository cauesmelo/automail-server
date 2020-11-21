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

followUpSequenceRouter.get(
  '/:followUpSequenceId',
  followUpSequenceController.detail,
);

followUpSequenceRouter.get(
  '/default/:userId',
  followUpSequenceController.default,
);

followUpSequenceRouter.put(
  '/:id',
  ensureAuthenticated,
  followUpSequenceController.update,
);

followUpSequenceRouter.delete(
  '/:id',
  ensureAuthenticated,
  followUpSequenceController.delete,
);

followUpSequenceRouter.post(
  '/',
  ensureAuthenticated,
  followUpSequenceController.create,
);

export default followUpSequenceRouter;
