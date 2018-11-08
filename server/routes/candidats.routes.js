import { Router } from 'express';
import * as CandidatsController from '../controllers/candidat.controller';

const router = new Router();

// Sign In a new candidat
router.route('/candidats/signup').post(CandidatsController.signUp);

// login with email
router.route('/candidats/login').post(CandidatsController.login);

export default router;
