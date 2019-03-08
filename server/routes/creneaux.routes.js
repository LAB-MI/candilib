import { Router } from 'express'
import * as CreneauxController from '../controllers/creneaux.controller'

const router = new Router()

// Get all Creneaux
router.route('/creneaux').get(CreneauxController.getCreneaux)

// Get one Candidat by id
router.route('/creneaux/:id').get(CreneauxController.getCreneau)

// Add a new Candidat
router.route('/creneaux').post(CreneauxController.addCreneau)

// Update Candidat by id
router.route('/creneaux/:id').put(CreneauxController.updateCreneau)

export default router
