import { Router } from 'express';
import * as CandidatsController from '../controllers/candidat.controller';

const router = new Router();

// verify candidat on login by magic link
router.route('/candidats/me').get(CandidatsController.verifyMe);

// Get all Candidats
router.route('/candidats').get(CandidatsController.getCandidats);

router
  .route('/candidats/contactus')
  .post(
    CandidatsController.findCandidatById,
    CandidatsController.mailToContactUs,
  );

// Get one Candidat by neph
router.route('/candidats/neph/:neph').get(CandidatsController.getCandidatNeph);

// Get one Candidat by id
router.route('/candidats/:id').post(CandidatsController.getCandidat);

router.route('/candidats/:id').put(CandidatsController.updateCandidat);

export default router;
