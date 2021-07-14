import { Router } from 'express';

import { usersRouter } from './users.routes';
import { sessionsRouter } from './sessions.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.post('/auth', ensureAuthenticated, (req, res) => {
  return res.json({ success: "You're authenticated!" });
});

export { routes };
