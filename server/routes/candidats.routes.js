import { Router } from 'express';
import * as CandidatsController from '../controllers/candidat.controller';
import { canToRegister } from '../controllers/whitelist.controller';

const router = new Router();
// router.use(canToRegister);

// Sign In a new candidat
router
  .route('/candidats/signup')
  .post(
    CandidatsController.ValidationParamRegister,
    canToRegister,
    CandidatsController.CheckCandidatIsSignedBefore,
    CandidatsController.checkMailIsUsed,
    CandidatsController.preUpdateInfoCandidat,
    CandidatsController.updateInfoCandidat,
    CandidatsController.signUp,
  );

// login with email
router.route('/candidats/login').post(canToRegister, CandidatsController.login);

export default router;
