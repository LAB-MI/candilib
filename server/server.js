import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import fileUpload from 'express-fileupload';
// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Run Webpack dev server in development mode
if (isDevMode) {
  // Webpack Requirements
  // eslint-disable-next-line global-require
  const webpack = require('webpack');
  // eslint-disable-next-line global-require
  const config = require('../webpack.config.dev');
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line global-require
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      watchOptions: {
        poll: 1000,
      },
    }),
  );
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { REDIRECTTOLEVEL } from './util/redirect2Level';
import { fetchComponentData } from './util/fetchData';
import candidats from './routes/candidats.routes';
import authAdminCandidats from './routes/admin.candidats.routes';
import authCandidats from './routes/auth.candidats.routes';
import creneaux from './routes/creneaux.routes';
import adminCreneaux from './routes/admin.creneaux.routes';
import users from './routes/users.routes';

import serverConfig from './config';
import verifyToken from './util/verifyToken';
import isAdmin from './util/isAdmin';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(
    serverConfig.mongoURL,
    error => {
      if (error) {
        console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
        throw error;
      }
    },
  );
}

// Set Level to redirect
routes.props.children.forEach(child => {
  if (child.type.name === 'PrivateRoute') {
    if (child.props.path !== undefined) {
      const pathAdmin = child.props.path.toLowerCase();
      REDIRECTTOLEVEL[pathAdmin] = child.props.admin ? 1 : 0;
    }
  }
});

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(fileUpload());
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use('/api', users);
app.use('/api', candidats);
app.use('/api/auth', verifyToken, authCandidats);
app.use('/api/admin', verifyToken, isAdmin, authAdminCandidats);
app.use('/api/auth', verifyToken, creneaux);
app.use('/api/admin', verifyToken, isAdmin, adminCreneaux);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest =
    process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest =
    process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${
          isProdMode
            ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />`
            : ''
        }
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      </head>
      <body>
        <div id="root">${
          process.env.NODE_ENV === 'production' ? html : `<div>${html}</div>`
        }</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${
            isProdMode
              ? `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>`
              : ''
          }
        </script>
        <script src='${
          isProdMode ? assetsManifest['/vendor.js'] : '/vendor.js'
        }'></script>
        <script src='${
          isProdMode ? assetsManifest['/app.js'] : '/app.js'
        }'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = isProdMode
    ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(
        /\n/g,
        `<br>${softTab}`,
      )}</pre>`
    : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(
        302,
        redirectLocation.pathname + redirectLocation.search,
      );
    }

    if (!renderProps) {
      return next();
    }

    // PrivateRoute
    if (typeof routes.props.children === 'object') {
      const childrenPrivateRoute = routes.props.children.find(child => {
        return (
          child.type !== undefined &&
          child.props !== undefined &&
          renderProps !== undefined &&
          renderProps.location !== undefined &&
          child.type.name === 'PrivateRoute' &&
          child.props.path === renderProps.location.pathname.toLowerCase() &&
          renderProps.location.pathname !== '/auth'
        );
      });
      if (childrenPrivateRoute !== undefined) {
        return res.redirect(
          302,
          '/auth?redirect=' + renderProps.location.pathname,
        );
      }
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>,
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch(error => next(error));
  });
});

// start app
app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(
      `Candilib is running on port: ${process.env.PORT ||
        serverConfig.port}! Build something amazing!`,
    ); // eslint-disable-line
  }
});

export default app;
