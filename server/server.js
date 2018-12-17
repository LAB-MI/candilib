import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import fileUpload from 'express-fileupload';

// Import required modules
import { REDIRECTTOLEVEL } from './util/redirect2Level';
import candidats from './routes/candidats.routes';
import creneaux from './routes/creneaux.routes';
import authCandidats from './routes/auth.candidats.routes';
import users from './routes/users.routes';
import admin from './routes/admin';

import serverConfig from './config';
import verifyToken from './util/verifyToken';
import isAdmin from './util/isAdmin';

// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    serverConfig.mongoURL,
    (error) => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
      }
    },
  );
}

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(fileUpload());
app.use(Express.static(path.resolve(__dirname, '../dist/client')));

app.use('/api/auth', verifyToken, authCandidats, creneaux);
app.use('/api/admin', verifyToken, isAdmin, admin);

app.use('/api', users, candidats);

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(
      `Candilib is running on port: ${process.env.PORT || serverConfig.port}!`,
    ); // eslint-disable-line
  }
});

export default app;
