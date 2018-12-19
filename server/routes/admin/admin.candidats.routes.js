import { Router } from 'express'
import multer from 'multer'

import * as CandidatsController from '../../controllers/candidat.controller'

const uploadCSV = multer({ dest: 'temp/csv/' })
const uploadJSON = multer({ dest: 'temp/json/' })

const router = new Router()

// Add a new Candidat
router.route('/candidats').post(CandidatsController.addCandidat)

// Update Candidat by id
router.route('/candidats/:id').put(CandidatsController.updateCandidat)

// Delete Candidat by id
router.route('/candidats/:id').delete(CandidatsController.deleteCandidat)

// Delete a Candidat by neph
router
  .route('/candidats/neph/:neph')
  .delete(CandidatsController.deleteCandidatNeph)

// Delete All candidats from Aurige
router.route('/candidats/destroy').get(CandidatsController.destroyAll)

// Export candidats from Aurige to CSV
router.route('/candidats/export').get(CandidatsController.exportToCSV)

// Purge candidats from Aurige permis OK
router.route('/candidats/permis/ok').get(CandidatsController.purgePermisOk)

// synchro candidats from Aurige
router
  .route('/candidats/upload/csv')
  .post(uploadCSV.single('file'), CandidatsController.uploadAurigeCSV)

router
  .route('/candidats/upload/json')
  .post(uploadJSON.single('file'), CandidatsController.uploadAurigeJSON)

export default router
