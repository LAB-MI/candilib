import { Router } from 'express'
import {
  getWhitelistCandidats,
  addWhitelist,
  deleteCandidat,
} from '../../controllers/whitelist.controller'

const router = new Router()

router.route('/whitelist/candidats').get(getWhitelistCandidats)
router.route('/whitelist/candidats').post(addWhitelist)
router.route('/whitelist/candidats/:id').delete(deleteCandidat)

export default router
