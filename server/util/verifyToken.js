import jwt from 'jsonwebtoken';
import serverConfig from '../config';

export default function verifyToken(req, res, next) {
  if (
    req.url === '/candidats/login'
      || req.url === '/candidats/signup'
      || (serverConfig.fastAccessApi
        && (req.url === '/candidats/export'
        || req.url === '/candidats'
        || req.url === '/candidats/upload/csv'
        || req.url === '/candidats/upload/json'
        || req.url === '/candidats/synchro'
        || req.url === '/creneaux'))
  ) {
    return next();
  }

  const token = req.headers['x-access-token'] || req.query.token;
  if (!token) {
    if (res !== undefined) {
      return res.status(403).send({ auth: false, message: 'Pas de Token ' });
    }

    return next({ status: 403, auth: false, message: 'Pas de Token ' });
  }

  jwt.verify(token, serverConfig.secret, (err, decoded) => {
    if (err) {
      if (res !== undefined) {
        return res
          .status(500)
          .send({ auth: false, message: 'Erreur de verification Token.' });
      }

      return next({ status: 500, auth: false, message: 'Pas de Token ' });
    }
    req.userId = decoded.id; // eslint-disable-line no-param-reassign
    req.userLevel = decoded.level; // eslint-disable-line no-param-reassign
    return next();
  });
}
