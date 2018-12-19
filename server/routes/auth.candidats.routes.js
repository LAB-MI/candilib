import { Router } from 'express'
import * as CandidatsController from '../controllers/candidat.controller'

const router = new Router()

router.route('/candidats/contactus').get(CandidatsController.mailToContactUs)

// Get all Candidats
router.route('/candidats').get(CandidatsController.getCandidats)

// Get one Candidat by id
router.route('/candidats/:id').get(CandidatsController.getCandidat)

// Get one Candidat by neph
router.route('/candidats/neph/:neph').get(CandidatsController.getCandidatNeph)

router.route('/candidats/:id').put(CandidatsController.updateCandidat)

export default router
