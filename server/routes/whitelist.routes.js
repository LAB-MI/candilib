import { Router } from 'express';
import * as WhitelistController from '../controllers/whitelist.controller';

const router = new Router();

router
  .route('/whiteliste/candidats')
  .get(WhitelistController.getWhitelistCandidats);
router.route('/whiteliste/add').get(WhitelistController.addWhitelist);
router.route('/whiteliste/remove').get(WhitelistController.deleteCandidat);

export default router;
