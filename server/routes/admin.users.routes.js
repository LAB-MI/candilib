import { Router } from 'express';

import * as UsersController from '../controllers/users.controller';

const router = new Router();

router.route('/users').post(UsersController.registerAdmin);

export default router;
