import jwt from 'jsonwebtoken';
import serverConfig from '../config';
import { TOKEN_HEADER_NAME } from '../constants';

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

  const token = req.headers[TOKEN_HEADER_NAME] || req.query.token;
  if (!token) {
    if (res !== undefined) {
      return res.status(401).send({ auth: false, message: 'Token absent' });
    }

    return next({ status: 401, auth: false, message: 'Token absent' });
  }

  try {
    const decoded = jwt.verify(token, serverConfig.secret);
    req.userId = decoded.id; // eslint-disable-line no-param-reassign
    req.userLevel = decoded.level; // eslint-disable-line no-param-reassign
    return next();
  } catch (error) {
    return res
      .status(401)
      .send({ auth: false, message: 'Token invalide' });
  }

}
