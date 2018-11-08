import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

router.route('/users/validate_token').get(AuthController.validateToken);
router.route('/users/login').post(AuthController.login);

export default router;
