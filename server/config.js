const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/candilib',
  port: process.env.PORT || 8000,
  portMail: process.env.PORT_MAIL,
  host: process.env.HOST || 'http://localhost',
  authentificationRoute: '/auth',
  secret: process.env.SECRET || 'secret',
  // fastAccessApi: process.env.FAST_ACCESS_API || false,
  smtpServer: process.env.SMTP_SERVER || '<server>',
  smtpService: process.env.SMTP_SERVICE || '<service>',
  smtpPort: process.env.SMTP_PORT || 25,
  mailUser: process.env.MAIL_USER || '<user>',
  mailPassword: process.env.MAIL_PASSWORD || '<passwd>',
  mailFrom: process.env.MAIL_FROM || '<mail_from>',
  appURL: process.env.APP_URL || 'http://localhost:8000',
};

export const smtpOptions = {
  host: config.smtpServer,
  port: config.smtpPort,
  secure: false,
  tls: {
    // do not failed with selfsign certificates
    rejectUnauthorized: false,
  },
};

// In development, if mailUser is not falsy, use it
// (see .env file at the root of the project to use an external SMTP like gmail)
if (process.env.NODE_ENV === 'development' && config.mailUser) {
  smtpOptions.auth = {
    user: config.mailUser,
    pass: config.mailPassword,
  };
  smtpOptions.service = config.service;
}

export default config;
