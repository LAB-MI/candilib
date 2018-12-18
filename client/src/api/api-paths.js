const apiPrefix = `${process.env.PUBLIC_URL || ''}/api`

export default {
  login: `${apiPrefix}/users/login`,
  sendMagicLink: `${apiPrefix}/candidats/login`,
  verifyToken: `${apiPrefix}/auth/verify-token`,
  creneaux: (id) => `${apiPrefix}/auth/creneaux${id ? `/${id}` : ''}`,
  signup: `${apiPrefix}/candidats/signup`,
  candidat: (id) => `${apiPrefix}/auth/candidats${id ? `/${id}` : ''}`,
  admin: {
    candidats: `${apiPrefix}/auth/candidats`,
    uploadCandidatsJson: `${apiPrefix}/admin/candidats/upload/json`,
    uploadCandidatsCsv: `${apiPrefix}/admin/candidats/upload/csv`,
    exportCsv: `${apiPrefix}/admin/candidats/export`,
    uploadPlacesCSV: `${apiPrefix}/admin/candidats/upload/csv`,
    whitelist: `${apiPrefix}/admin/whitelist/candidats`,
  }
}
