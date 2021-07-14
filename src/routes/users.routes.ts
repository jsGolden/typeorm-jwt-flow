import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usersRoutes = Router();

usersRoutes.get('/', UsersController.index);

usersRoutes.get('/:id', UsersController.show);

export { usersRoutes };
