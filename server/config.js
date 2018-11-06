const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/candilib',
  port: process.env.PORT || 8000,
  host: process.env.HOST || 'http://localhost:8000',
  authentificationRoute: '/auth',
  secret: process.env.SECRET || 'secret',
  fastAccessApi: process.env.FAST_ACCESS_API || false,
  smtpServer: '10.237.5.29',
  smtpPort: 25,
  mailUser: '<user>',
  mailPassword: '<passwd>',
  mailFrom: '<from>',
};

export default config;
