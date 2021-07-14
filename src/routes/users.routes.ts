import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get('/', usersController.index);
usersRoutes.post('/', usersController.store);

usersRoutes.get('/:id', usersController.show);

export { usersRoutes };
