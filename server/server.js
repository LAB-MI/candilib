import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import fileUpload from 'express-fileupload';

import candidats from './routes/candidats.routes';
import creneaux from './routes/creneaux.routes';
import authCandidats from './routes/auth.candidats.routes';
import users from './routes/users.routes';
import admin from './routes/admin';

import serverConfig from './config';
import verifyToken from './util/verifyToken';
import isAdmin from './util/isAdmin';

const app = new Express();

/*
const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = process.env.NODE_ENV === 'production';
*/

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(fileUpload());
app.use(Express.static(path.resolve(__dirname, '../dist/client')));

app.use('/api/auth/verify-token', verifyToken, (req, res) => (res.json({ isAuthenticated: true, id: req.userId })));
app.use('/api/auth', verifyToken, authCandidats, creneaux);
app.use('/api/admin', verifyToken, isAdmin, admin);

app.use('/api', users, candidats);

const startServer = () => {
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(
        `Candilib is running on port: ${process.env.PORT || serverConfig.port}`,
      );
    } else {
      console.error(
        `Could not start server`, error
      )
    }
  });
}

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    serverConfig.mongoURL,
    { useNewUrlParser: true },
    (error) => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
      }
      // Start listening to incoming requests
      startServer();
    },
  );
} else {
  startServer();
}


export default app;
