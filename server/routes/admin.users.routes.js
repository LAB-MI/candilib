import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
const router = new Router();

router.route('/users/add').post(AuthController.registerAdmin);

export default router;
