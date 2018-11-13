import { Router } from 'express';
import * as CreneauxController from '../controllers/creneaux.controller';
import multer from 'multer';

const uploadCSV = multer({ dest: 'temp/csv/' });

const router = new Router();

// Get all Creneaux
router.route('/creneaux').get(CreneauxController.getCreneaux);

// Get one Candidat by id
router.route('/creneaux/:id').post(CreneauxController.getCreneau);

// Add a new Candidat
router.route('/creneaux').post(CreneauxController.addCreneau);

// Update Candidat by id
router.route('/creneaux/:id').put(CreneauxController.updateCreneau);

// Delete Candidat by id
router.route('/creneaux/:id').delete(CreneauxController.deleteCreneau);

export default router;
