import { Router } from 'express';
import * as CandidatsController from '../controllers/candidat.controller';

const router = new Router();

// Sign In a new candidat
router.route('/candidats/signup').post(CandidatsController.signUp);

// verify candidat on login by magic link
router.route('/candidats/me').get(CandidatsController.verifyMe);

// login with email
router.route('/candidats/login').post(CandidatsController.login);

// Get all Candidats
router.route('/candidats').get(CandidatsController.getCandidats);

// Get one Candidat by id
router.route('/candidats/:id').post(CandidatsController.getCandidat);

// Get one Candidat by neph
router.route('/candidats/neph/:neph').get(CandidatsController.getCandidatNeph);

export default router;
