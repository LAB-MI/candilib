import { Router } from 'express';
import * as CandidatsController from '../controllers/candidat.controller';
const router = new Router();

// Get all Candidats
router.route('/candidats').get(CandidatsController.getCandidats);

// Get one Candidat by id
router.route('/candidats/:id').get(CandidatsController.getCandidat);

// Add a new Candidat
router.route('/candidats').post(CandidatsController.addCandidat);

// Delete a Candidat by id
router.route('/candidats/:id').delete(CandidatsController.deleteCandidat);

// Import candidats from Aurige
router.route('/import').get(CandidatsController.importCandidatAurige)

export default router;

