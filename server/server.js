import Express from 'express'
import compression from 'compression'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'
import fileUpload from 'express-fileupload'
import util from 'util'

import candidats from './routes/candidats.routes'
import creneaux from './routes/creneaux.routes'
import authCandidats from './routes/auth.candidats.routes'
import users from './routes/users.routes'
import admin from './routes/admin'

import serverConfig from './config'
import verifyToken from './util/verifyToken'
import isAdmin from './util/isAdmin'

import npmVersion from './package.json'

const app = new Express()

/*
const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = process.env.NODE_ENV === 'production';
*/

mongoose.Promise = global.Promise
mongoose.connect = util.promisify(mongoose.connect)

app.use(compression())
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(fileUpload())
app.use(Express.static(path.resolve(__dirname, '../dist/client')))

app.use('/api/auth/verify-token', verifyToken, (req, res) => (res.json({ isAuthenticated: true, id: req.userId })))
app.use('/api/auth', verifyToken, authCandidats, creneaux)
app.use('/api/admin', verifyToken, isAdmin, admin)

app.use('/api', users, candidats)

app.get('/api/version', function (req, res) {
  res.send(npmVersion.version)
})

const startServer = () => {
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(
        `Candilib version ${npmVersion.version} is running on port: ${process.env.PORT || serverConfig.port}`,
      )
    } else {
      console.error(
        `Could not start server`, error
      )
    }
  })
}

let mongoConnectionAttempt = 10

const startServerWithMongo = async () => {
  try {
    await mongoose.connect(
      serverConfig.mongoURL,
      { useNewUrlParser: true },
    )
    console.log('Connected to Mongo!')
    startServer()
  } catch (err) {
    --mongoConnectionAttempt
    if (mongoConnectionAttempt > 0) {
      console.error(`Could not connect to Mongo, ${mongoConnectionAttempt} tries left:'`)
      setTimeout(startServerWithMongo, 2000)
      return
    }
    console.error('Could not connect to Mongo, make sure it is started and listening on the appropriate port')
  }
}

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  startServerWithMongo()
} else {
  startServer()
}

export default app
