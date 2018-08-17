import { Router } from 'express';
import * as CandidatsController from '../controllers/candidat.controller';
const router = new Router();

// Sign In a new candidat
router.route('/signup').post(CandidatsController.signUp);

// Get all Candidats
router.route('/candidats').get(CandidatsController.getCandidats);

// Get one Candidat by id
router.route('/candidats/:id').get(CandidatsController.getCandidat);

// Get one Candidat by neph
router.route('/candidats/neph/:neph').get(CandidatsController.getCandidatNeph);

// Add a new Candidat
router.route('/candidats').post(CandidatsController.addCandidat);

// Delete a Candidat by id
router.route('/candidats/:id').delete(CandidatsController.deleteCandidat);

// Delete a Candidat by neph
router.route('/candidats/neph/:neph').delete(CandidatsController.deleteCandidatNeph);

// Delete All candidats from Aurige
router.route('/candidats/destroy').get(CandidatsController.destroyAll);

// Export candidats from Aurige to CSV
router.route('/export').get(CandidatsController.exportToCSV);

// Purge candidats from Aurige permis OK
router.route('/candidats/permis/ok').get(CandidatsController.purgePermisOk);

export default router;

