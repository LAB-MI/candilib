const apiPrefix = `${process.env.PUBLIC_PATH || ''}/api`

export default {
  login: `${apiPrefix}/users/login`,
  sendMagicLink: `${apiPrefix}/candidats/login`,
  verifyToken: `${apiPrefix}/auth/verify-token`,
  creneaux: `${apiPrefix}/auth/creneaux`,
  signup: `${apiPrefix}/candidats/signup`,
  admin: {
    candidats: `${apiPrefix}/auth/candidats`,
    uploadCandidatsJson: `${apiPrefix}/admin/candidats/upload/json`,
    uploadCandidatsCsv: `${apiPrefix}/admin/candidats/upload/csv`,
    exportCsv: `${apiPrefix}/admin/candidats/export`,
    uploadPlacesCSV: `${apiPrefix}/admin/candidats/upload/csv`,
    whitelist: `${apiPrefix}/admin/whitelist/candidats`,
  }
}
