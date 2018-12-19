const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/candilib',
  port: process.env.PORT || 8000,
  portClient: process.env.PORT_CLIENT,
  host: process.env.HOST || 'http://localhost',
  authentificationRoute: `${process.env.PUBLIC_PATH || ''}/connexion`,
  secret: process.env.SECRET || 'secret',
  smtpServer: process.env.SMTP_SERVER || '<server>',
  smtpService: process.env.SMTP_SERVICE || undefined,
  smtpPort: process.env.SMTP_PORT || 25,
  mailUser: process.env.MAIL_USER || undefined,
  mailPassword: process.env.MAIL_PASSWORD || undefined,
  mailFrom: process.env.MAIL_FROM || '<mail_from>',
  tokenCandidatExpired: process.env.CANDIDAT_EXPIREDIN || '1h',
  supportMail: process.env.EMAIL_SUPPORT || 'candilib93@developpement-durable.gouv.fr',
  PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:80',
}

export const smtpOptions = {
  host: config.smtpServer,
  port: config.smtpPort,
  secure: false,
  tls: {
    // do not failed with selfsign certificates
    rejectUnauthorized: false,
  },
}

// In development, if mailUser is not falsy, use it
// (see .env file at the root of the project to use an external SMTP like gmail)
if (process.env.NODE_ENV === 'development' && config.mailUser) {
  smtpOptions.auth = {
    user: config.mailUser,
    pass: config.mailPassword,
  }
  smtpOptions.service = config.smtpService
}

export default config
