import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

router.route('/users/register').post(AuthController.register);
router.route('/users/me').get(AuthController.verifyMe);
router.route('/users/login').post(AuthController.login);

export default router;
