import { Router } from 'express'
import multer from 'multer'

// import * as CreneauxController from '../../controllers/creneaux.controller'
import {
  uploadAurigeCSV,
  getCreneau,
  deleteCreneau,
} from '../../controllers/creneaux.controller'

const uploadCSV = multer({ dest: 'temp/csv/' })

const router = new Router()

// synchro creneaux from Aurige
router.route('/creneaux/upload/csv').post(uploadCSV.single('file'), uploadAurigeCSV)

router.route('/creneaux/:id').get(getCreneau)
router.route('/creneaux/:id').delete(deleteCreneau)

export default router
