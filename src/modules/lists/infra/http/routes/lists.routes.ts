import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ListsController from '@modules/lists/infra/http/controllers/ListsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.use(ensureAuthenticated);

// appointmentsRouter.post(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       provider_id: Joi.string().uuid().required(),
//       date: Joi.date().required(),
//     },
//   }),
//   appointmentsController.create,
// );

listsRouter.get('/', listsController.index);

listsRouter.post('/', listsController.create);

export default listsRouter;
