import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', usersController.index);
usersRouter.post('/', usersController.create);

usersRouter.get('/:id', usersController.show);

export { usersRouter };
