import { Router } from 'express';
import * as WhitelistController from '../../controllers/whitelist.controller';

const router = new Router();

router
  .route('/whitelist/candidats')
  .get(WhitelistController.getWhitelistCandidats);
router.route('/whitelist/candidats').post(WhitelistController.addWhitelist);
router
  .route('/whitelist/candidats/:id')
  .delete(WhitelistController.deleteCandidat);

export default router;
