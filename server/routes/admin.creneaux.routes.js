import { Router } from 'express';
import * as CreneauxController from '../controllers/creneaux.controller';
import multer from 'multer';

const uploadCSV = multer({ dest: 'temp/csv/' });

const router = new Router();

// synchro creneaux from Aurige
router
  .route('/creneaux/upload/csv')
  .post(uploadCSV.single('file'), CreneauxController.uploadAurigeCSV);

export default router;
