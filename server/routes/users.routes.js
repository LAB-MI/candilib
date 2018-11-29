import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import * as UsersController from '../controllers/users.controller';

const router = new Router();

router.route('/users/validate_token').get(AuthController.validateToken);
router.route('/users/login').post(AuthController.login);
router.route('/users').post(UsersController.registerAdmin);

export default router;
