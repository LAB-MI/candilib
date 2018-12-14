import { Router } from 'express';

import authAdminCandidats from './admin.candidats.routes';
import adminCreneaux from './admin.creneaux.routes';
import adminUsers from './admin.users.routes';
import whitelists from './admin.whitelist.routes';

const router = new Router();


router.use(authAdminCandidats, adminCreneaux, adminUsers, whitelists);

export default router;
