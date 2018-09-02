const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/candilib',
  port: process.env.PORT || 8000,
  host: process.env.HOST || 'http://localhost:8000',
  secret: process.env.SECRET || 'secret',
};

export default config;
