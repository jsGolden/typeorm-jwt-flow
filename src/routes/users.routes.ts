import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get('/', usersController.index);

usersRoutes.get('/:id', usersController.show);

export { usersRoutes };
